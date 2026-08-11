# Markdown knowledge base

Add `.md` files here for the RAG chatbot. They are loaded together with `csv/` and `json/` data.

## Your files from Downloads

To use your own copies of these documents, copy them into this folder:

```powershell
cd F:\chatbot-for-student-support
mkdir knowledge-base\md -Force
copy "C:\Users\mkmah\Downloads\files (6)\01_about.md" knowledge-base\md\
copy "C:\Users\mkmah\Downloads\files (6)\02_graduate_programmes.md" knowledge-base\md\
copy "C:\Users\mkmah\Downloads\files (6)\03_admissions_faq.md" knowledge-base\md\
```

## Rebuild the vector database

After adding or editing files:

```powershell
cd F:\chatbot-for-student-support
uv run python .cursor/scripts/build_vectorstore.py
```

Restart the backend (`uvicorn`) so the chatbot uses the new index.
