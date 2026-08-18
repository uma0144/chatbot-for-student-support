# ITM Student Support Chatbot — Feature Roadmap

This document maps your requested enterprise features to what is implemented today and what to configure for production.

| Feature | Status | Notes |
|---------|--------|-------|
| **JWT Authentication** | ✅ Done | Login/register with bearer tokens; session restore on reload |
| **Role-Based Access Control** | ✅ Done | `student` / `admin` roles; admin routes use `require_admin` |
| **Chat History** | ✅ Done | Saved per user in SQLite; **Chat History** page + API clear |
| **Knowledge Base (Markdown)** | ✅ Done | 15 topic categories under `knowledge-base/md/` |
| **PDF Knowledge Base** | ✅ Done | PDFs in `knowledge-base/pdf/`; admin upload API; rebuild vector store after upload |
| **Multi-language Support** | ✅ Done | English / Hindi via header language selector (`language: en` \| `hi`) |
| **Voice Chat (STT)** | ✅ Done | Browser mic → Web Speech API in chat input (Chrome/Edge recommended) |
| **Text-to-Speech** | ✅ Done | **Listen** on each bot reply (browser `speechSynthesis`) |
| **Admin Dashboard** | ✅ Done | Stats, user list, PDF upload (admin sidebar link) |
| **Email Notifications** | ✅ Configurable | SMTP in `.env`; ticket create emails support + user when configured |
| **Docker Support** | ✅ Done | `docker compose up --build` |
| **Cloud Deployment** | ✅ Documented | See `docs/DEPLOY.md` (LAN, Docker server, ngrok) |
| **My Tickets / Profile** | ✅ Done | Portal pages with SQLite-backed tickets |

## Quick setup

### Admin account

```bash
uv run python scripts/create_admin.py --email you@example.com --password YourPass --name "Admin"
```

Log out and log in again to see the **Admin** sidebar item.

### PDF knowledge base

1. Admin → **Choose PDF** (or copy files to `knowledge-base/pdf/`).
2. Rebuild embeddings:

```bash
uv run python scripts/build_vectorstore.py
```

3. Restart the backend.

### Email (optional)

Add to `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASSWORD=app-password
SMTP_FROM=support@itmuniversity.ac.in
SUPPORT_EMAIL=admission@itmuniversity.ac.in
```

### Voice features

Uses the browser — no server key required. Works best in **Chrome** or **Edge** with microphone permission. Hindi voice input uses `hi-IN` when Hindi is selected.

## Local development (Windows-friendly)

```powershell
# Terminal 1 — backend
uv run uvicorn backend.main:app --host 127.0.0.1 --port 8081 --reload

# Terminal 2 — frontend
cd frontend
Set-Content -Path .env.local -Value "VITE_API_BASE_URL=http://127.0.0.1:8081" -Encoding utf8
npm run dev
```

## Future enhancements (not in scope yet)

- Server-side speech (Whisper / cloud TTS) for browsers without Web Speech API
- Admin UI to change user roles and ticket status
- Automatic vector store rebuild after PDF upload
- More languages beyond English and Hindi
- Push/email digests for ticket status changes
