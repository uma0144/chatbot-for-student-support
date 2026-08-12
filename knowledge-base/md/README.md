# Markdown knowledge base

Official ITM University content for the RAG chatbot. Files are loaded from `knowledge-base/md/` together with `csv/` and `json/`.

| File | Content |
|------|---------|
| `01_about.md` | Vision, mission, values, schools, contacts |
| `02_graduate_programmes.md` | All undergraduate courses |
| `03_admissions_faq.md` | Admissions FAQ |
| `04_pg_programmes.md` | Postgraduate & Ph.D. programmes |
| `05_fees_scholarships.md` | Fees, scholarships, hostel |
| `06_placements_campus.md` | Placements, training, campus life |

## Rebuild vector index

```powershell
cd F:\chatbot-for-student-support
uv run python .cursor/scripts/build_vectorstore.py
```

Restart backend after rebuild. For Docker, delete the `vector-db` volume and rebuild images.
