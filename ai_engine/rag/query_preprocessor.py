"""
Normalize student queries before vector search — fixes common typos and abbreviations.
"""

import re
from difflib import get_close_matches

# Frequent misspellings seen in student chat
_TYPO_MAP = {
    "stuature": "structure",
    "struture": "structure",
    "strucure": "structure",
    "structre": "structure",
    "structue": "structure",
    "eligibilty": "eligibility",
    "eligiblity": "eligibility",
    "eligibity": "eligibility",
    "addmission": "admission",
    "admision": "admission",
    "addmision": "admission",
    "scholership": "scholarship",
    "scholorship": "scholarship",
    "scholarhip": "scholarship",
    "hostal": "hostel",
    "hosel": "hostel",
    "placment": "placement",
    "placemnt": "placement",
    "exmination": "examination",
    "examintaion": "examination",
    "calender": "calendar",
    "calandar": "calendar",
    "departmnt": "department",
    "departement": "department",
    "faculity": "faculty",
    "facalty": "faculty",
    "univercity": "university",
    "univesity": "university",
    "fees": "fee",
}

# ITM / academic vocabulary for fuzzy correction
_DOMAIN_TERMS = frozenset(
    {
        "fee",
        "structure",
        "scholarship",
        "admission",
        "eligibility",
        "hostel",
        "placement",
        "examination",
        "calendar",
        "department",
        "faculty",
        "contact",
        "course",
        "programme",
        "program",
        "btech",
        "mba",
        "mca",
        "bba",
        "bpharm",
        "mpharm",
        "nursing",
        "agriculture",
        "pharmacy",
        "engineering",
        "management",
        "library",
        "campus",
        "hostel",
        "scholarship",
        "nptel",
        "swayam",
        "vac",
        "lms",
        "mis",
        "ragging",
        "internship",
        "recruiter",
        "package",
        "caution",
        "refund",
        "nest",
        "jee",
        "cuet",
        "gate",
        "cat",
        "neet",
    }
)

# Expand shorthand students use in chat
_PHRASE_REPLACEMENTS = [
    (r"\baiml\b", "AI machine learning"),
    (r"\bai\s*ml\b", "AI machine learning"),
    (r"\bdsml\b", "data science machine learning"),
    (r"\bcse\b", "computer science engineering"),
    (r"\bb\.?\s*tech\b", "B.Tech"),
    (r"\bbtech\b", "B.Tech"),
    (r"\bm\.?\s*tech\b", "M.Tech"),
    (r"\bmtech\b", "M.Tech"),
    (r"\bbca\b", "BCA"),
    (r"\bmca\b", "MCA"),
    (r"\bbba\b", "BBA"),
    (r"\bmba\b", "MBA"),
    (r"\bitm\b", "ITM University"),
    (r"\bfee\s+stuature\b", "fee structure"),
    (r"\bfee\s+struture\b", "fee structure"),
]


def _fix_word(word: str) -> str:
    lower = word.lower()
    if lower in _TYPO_MAP:
        return _TYPO_MAP[lower]
    if len(lower) < 4 or not lower.isalpha():
        return word
    matches = get_close_matches(lower, _DOMAIN_TERMS, n=1, cutoff=0.82)
    return matches[0] if matches else word


def normalize_query(query: str) -> str:
    """Return a search-friendly version of the student question."""
    text = query.strip()
    if not text:
        return text

    for pattern, replacement in _PHRASE_REPLACEMENTS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    words = re.split(r"(\s+)", text)
    fixed = "".join(_fix_word(w) if w.strip() and not w.isspace() else w for w in words)

    return re.sub(r"\s+", " ", fixed).strip()


def search_queries(query: str) -> list[str]:
    """
    Build one or more query strings for retrieval (original + normalized, deduped).
    """
    normalized = normalize_query(query)
    seen: set[str] = set()
    out: list[str] = []
    for q in (query.strip(), normalized):
        key = q.lower()
        if q and key not in seen:
            seen.add(key)
            out.append(q)
    return out
