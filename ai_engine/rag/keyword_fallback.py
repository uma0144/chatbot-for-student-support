"""
Keyword fallback when vector search misses — scans knowledge-base markdown by term overlap.
"""

import re
from pathlib import Path

from langchain_core.documents import Document

from .query_preprocessor import normalize_query

_STOPWORDS = frozenset(
    {
        "what",
        "is",
        "the",
        "a",
        "an",
        "of",
        "for",
        "to",
        "in",
        "at",
        "how",
        "can",
        "i",
        "get",
        "me",
        "tell",
        "about",
        "and",
        "or",
        "itm",
        "university",
        "gwalior",
        "please",
        "give",
        "want",
        "know",
    }
)

# Map question themes to markdown files (always inject when theme detected)
_TOPIC_FILES: list[tuple[tuple[str, ...], str]] = [
    (("fee", "fees", "tuition", "cost", "structure", "stuature", "caution"), "05_fees_scholarships.md"),
    (("scholarship", "scholership", "concession", "waiver"), "05_fees_scholarships.md"),
    (("hostel", "hostal", "mess", "ac "), "09_hostel.md"),
    (("admission", "apply", "application", "nest", "enroll"), "03_admissions_faq.md"),
    (("eligib", "qualification", "percentage", "marks"), "08_eligibility.md"),
    (("b.tech", "btech", "engineering", "aiml", "cse", "m.tech", "mtech"), "02_graduate_programmes.md"),
    (("mba", "bba", "b.com", "management", "commerce"), "02_graduate_programmes.md"),
    (("mca", "bca", "computer application"), "02_graduate_programmes.md"),
    (("placement", "package", "recruit", "company", "intern"), "06_placements_campus.md"),
    (("exam", "grade", "sgpa", "cgpa", "revaluation"), "11_examinations.md"),
    (("calendar", "semester", "holiday", "date"), "10_academic_calendar.md"),
    (("faculty", "dean", "vc", "professor", "leadership"), "12_faculty_leadership.md"),
    (("contact", "phone", "email", "toll", "helpline"), "13_contacts.md"),
    (("campus", "lab", "library", "sport", "infrastructure"), "14_campus_infrastructure.md"),
    (("lms", "mis", "nptel", "swayam", "vac", "ragging", "portal"), "15_student_services.md"),
    (("department", "school", "soet", "som", "pharmacy", "nursing"), "07_departments.md"),
    (("about", "vision", "mission", "history"), "01_about.md"),
    (("pg", "phd", "master", "postgraduate"), "04_pg_programmes.md"),
]


def _terms(query: str) -> set[str]:
    text = normalize_query(query).lower()
    words = re.findall(r"[a-z0-9]+", text)
    return {w for w in words if len(w) > 2 and w not in _STOPWORDS}


def _kb_md_dir(kb_path: str) -> Path:
    return Path(kb_path) / "md"


def topic_snippets(question: str, kb_path: str = "knowledge-base") -> list[Document]:
    """Load full markdown files that match detected topics in the question."""
    q = normalize_query(question).lower()
    md_dir = _kb_md_dir(kb_path)
    docs: list[Document] = []
    seen_files: set[str] = set()

    for keywords, filename in _TOPIC_FILES:
        if any(kw in q for kw in keywords):
            if filename in seen_files:
                continue
            path = md_dir / filename
            if not path.is_file():
                continue
            seen_files.add(filename)
            content = path.read_text(encoding="utf-8").strip()
            if content:
                docs.append(
                    Document(
                        page_content=content,
                        metadata={"source": filename, "type": "topic"},
                    )
                )
    return docs


def keyword_search(
    question: str,
    kb_path: str = "knowledge-base",
    k: int = 5,
) -> list[Document]:
    """Score markdown sections by keyword overlap with the question."""
    terms = _terms(question)
    if not terms:
        return []

    md_dir = _kb_md_dir(kb_path)
    if not md_dir.is_dir():
        return []

    scored: list[tuple[int, Document]] = []

    for path in sorted(md_dir.glob("*.md")):
        if path.name.upper() == "README.MD":
            continue
        text = path.read_text(encoding="utf-8")
        sections = re.split(r"\n(?=## )", text)
        for section in sections:
            body = section.strip()
            if len(body) < 40:
                continue
            lower = body.lower()
            score = sum(lower.count(t) for t in terms)
            if score > 0:
                scored.append(
                    (
                        score,
                        Document(
                            page_content=body,
                            metadata={"source": path.name, "type": "keyword"},
                        ),
                    )
                )

    scored.sort(key=lambda x: (-x[0], x[1].metadata.get("source", "")))
    return [doc for _, doc in scored[:k]]


def merge_documents(*groups: list[Document], limit: int = 12) -> list[Document]:
    """Deduplicate documents by content prefix, preserve order."""
    seen: set[str] = set()
    merged: list[Document] = []
    for group in groups:
        for doc in group:
            key = doc.page_content[:300]
            if key not in seen:
                seen.add(key)
                merged.append(doc)
            if len(merged) >= limit:
                return merged
    return merged
