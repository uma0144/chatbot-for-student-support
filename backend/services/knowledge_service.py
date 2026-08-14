"""Knowledge base topics served to the student portal."""

from pathlib import Path

from backend.core.env import PROJECT_ROOT

KB_ROOT = PROJECT_ROOT / "knowledge-base"
MD_DIR = KB_ROOT / "md"

TOPICS = [
    {
        "id": "about",
        "title": "About ITM University",
        "description": "History, vision, mission, and accreditation",
        "file": "01_about.md",
        "emoji": "🏫",
    },
    {
        "id": "ug-programmes",
        "title": "Undergraduate Programmes",
        "description": "B.Tech, BBA, BCA, Law, Nursing, and more",
        "file": "02_graduate_programmes.md",
        "emoji": "🎓",
    },
    {
        "id": "admissions",
        "title": "Admissions & FAQ",
        "description": "How to apply, ITM NEST, and counselling",
        "file": "03_admissions_faq.md",
        "emoji": "📝",
    },
    {
        "id": "pg-programmes",
        "title": "Postgraduate & Ph.D.",
        "description": "MBA, M.Tech, MCA, and research programmes",
        "file": "04_pg_programmes.md",
        "emoji": "🎓",
    },
    {
        "id": "fees-scholarships",
        "title": "Fees & Scholarships",
        "description": "Fee structure, caution money, and scholarships",
        "file": "05_fees_scholarships.md",
        "emoji": "💰",
    },
    {
        "id": "placements",
        "title": "Placements & Training",
        "description": "Recruiters, packages, and internship support",
        "file": "06_placements_campus.md",
        "emoji": "💼",
    },
    {
        "id": "departments",
        "title": "Departments & Schools",
        "description": "Faculties, schools, and programme mapping",
        "file": "07_departments.md",
        "emoji": "📚",
    },
    {
        "id": "eligibility",
        "title": "Eligibility Criteria",
        "description": "Requirements for UG, PG, and integrated programmes",
        "file": "08_eligibility.md",
        "emoji": "✅",
    },
    {
        "id": "hostel",
        "title": "Hostel & Accommodation",
        "description": "Boys/girls hostels, mess, and fees",
        "file": "09_hostel.md",
        "emoji": "🏠",
    },
    {
        "id": "calendar",
        "title": "Academic Calendar",
        "description": "Semesters, holidays, and important dates",
        "file": "10_academic_calendar.md",
        "emoji": "📅",
    },
    {
        "id": "examinations",
        "title": "Examinations & Grading",
        "description": "Exam rules, grading, and revaluation",
        "file": "11_examinations.md",
        "emoji": "📝",
    },
    {
        "id": "faculty",
        "title": "Faculty & Leadership",
        "description": "Leadership team and academic structure",
        "file": "12_faculty_leadership.md",
        "emoji": "👨‍🏫",
    },
    {
        "id": "contacts",
        "title": "Contacts",
        "description": "Admission, exam cell, and department contacts",
        "file": "13_contacts.md",
        "emoji": "📞",
    },
    {
        "id": "campus",
        "title": "Campus & Infrastructure",
        "description": "Labs, library, sports, and facilities",
        "file": "14_campus_infrastructure.md",
        "emoji": "🏛️",
    },
    {
        "id": "student-services",
        "title": "Student Services",
        "description": "MIS portal, LMS, NPTEL, anti-ragging",
        "file": "15_student_services.md",
        "emoji": "👨‍🎓",
    },
]


def list_topics() -> list[dict]:
    return TOPICS


def get_topic(topic_id: str) -> dict | None:
    for topic in TOPICS:
        if topic["id"] == topic_id:
            path = MD_DIR / topic["file"]
            content = path.read_text(encoding="utf-8") if path.is_file() else ""
            return {**topic, "content": content}
    return None


def load_faqs() -> list[dict]:
    import json

    path = KB_ROOT / "json" / "faqs.json"
    return json.loads(path.read_text(encoding="utf-8"))


def load_notices(limit: int = 20) -> list[dict]:
    import json

    path = KB_ROOT / "json" / "notices.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    records = data.get("records", data if isinstance(data, list) else [])
    return records[:limit]
