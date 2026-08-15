# Markdown Knowledge Base — ITM University Gwalior

Official content for the RAG student-support chatbot. Files in `knowledge-base/md/` are loaded together with `csv/` and `json/` by `ai_engine/rag/loader.py` (skips this README).

## Category Index (15 Topics)

| # | Topic | File |
|---|-------|------|
| 🏫 | University (about, history, vision, mission) | `01_about.md` |
| 🎓 | Courses — Undergraduate | `02_graduate_programmes.md` |
| 🎓 | Courses — Postgraduate & Ph.D. | `04_pg_programmes.md` |
| 📚 | Departments & Schools | `07_departments.md` |
| 📝 | Admissions & FAQ | `03_admissions_faq.md` |
| ✅ | Eligibility (all courses) | `08_eligibility.md` |
| 💰 | Fees & Caution Money | `05_fees_scholarships.md` |
| 🎓 | Scholarships (rules, amounts) | `05_fees_scholarships.md` |
| 🏠 | Hostel | `09_hostel.md` |
| 📅 | Academic Calendar & Dates | `10_academic_calendar.md` |
| 📝 | Examinations & Grading | `11_examinations.md` |
| 👨‍🏫 | Faculty & Leadership | `12_faculty_leadership.md` |
| 📞 | Contacts (all offices) | `13_contacts.md` |
| 💼 | Placements & Training | `06_placements_campus.md` |
| 🏛️ | Campus & Infrastructure | `14_campus_infrastructure.md` |
| 👨‍🎓 | Student Services (LMS, MIS, NPTEL, VAC, anti-ragging) | `15_student_services.md` |

## Also Available

- `knowledge-base/csv/itm_chatbot_chunks.csv` — 229 RAG chunks (contacts, labs, exam notices)
- `knowledge-base/json/faqs.json` — admission FAQs
- `knowledge-base/json/notices.json` — exam time-tables and fee notices
- `knowledge-base/json/reference_links.json` — 35 official URLs

## Rebuild Vector Index

```powershell
cd F:\chatbot-for-student-support
uv run python scripts/build_vectorstore.py
```

Restart backend after rebuild. For Docker, delete the `vector-db` volume and rebuild images.

## Official Website

https://www.itmuniversity.ac.in
