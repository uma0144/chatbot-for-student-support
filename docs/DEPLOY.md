# Deploy ITM Student Support Chatbot for Everyone

Right now the app runs only on **your PC** (`localhost`). To let **other students, teachers, or anyone** use it, put it on a **server** with a **public URL** or **campus network IP**.

---

## Choose an option

| Option | Best for | Difficulty |
|--------|----------|------------|
| **A. Docker on a server** | Real deployment (recommended) | Medium |
| **B. Same Wi‑Fi / LAN** | Demo in a lab or classroom | Easy |
| **C. ngrok (temporary link)** | Quick demo for 1–2 hours | Very easy |

---

## A. Docker — recommended for “everyone on the internet”

Works on a **VPS** (DigitalOcean, AWS, Azure, university server) or any PC with a **public IP**.

### 1. On the server

```bash
git clone https://github.com/uma0144/chatbot-for-student-support.git
cd chatbot-for-student-support
cp .env.example .env
```

Edit `.env`:

```env
GROQ_API_KEY=your_groq_key_here
SECRET_KEY=use-a-long-random-string-at-least-32-chars
FRONTEND_URL=http://YOUR_SERVER_IP:5173
CORS_ORIGINS=http://YOUR_SERVER_IP:5173
```

If you use a **domain** (e.g. `https://chat.itmuniversity.ac.in`):

```env
FRONTEND_URL=https://chat.itmuniversity.ac.in
CORS_ORIGINS=https://chat.itmuniversity.ac.in
```

### 2. Start with Docker

```bash
docker compose up --build -d
```

First run can take **10–20 minutes** (embeddings + FAISS build).

### 3. Open firewall

Allow inbound **TCP port 5173** (and **8000** only if you need API docs directly).

### 4. Share the link

```
http://YOUR_SERVER_IP:5173
```

Students **register** their own account, then use Chat, Knowledge Base, FAQs, and Tickets.

### 5. Stop / restart

```bash
docker compose down
docker compose up -d
```

---

## B. Same Wi‑Fi / campus LAN (no cloud)

Others on the **same network** open your PC’s IP.

### 1. Find your PC IP (PowerShell)

```powershell
ipconfig
```

Look for **IPv4 Address** (e.g. `192.168.1.105`).

### 2. Backend (listen on all interfaces)

```powershell
cd F:\chatbot-for-student-support
uv run uvicorn backend.main:app --host 0.0.0.0 --port 8081 --reload
```

### 3. Frontend

```powershell
cd F:\chatbot-for-student-support\frontend
Set-Content -Path .env.local -Value "VITE_API_BASE_URL=http://192.168.1.105:8081" -Encoding utf8
npm run dev -- --host 0.0.0.0 --port 5173
```

Replace `192.168.1.105` with **your** IP.

### 4. Windows Firewall

Allow **Python** and **Node** on private networks, or allow ports **8081** and **5173**.

### 5. Share with classmates

```
http://192.168.1.105:5173
```

**Note:** Your PC must stay on and both terminals must keep running.

---

## C. ngrok — quick public demo (temporary)

Good for showing the project; link changes when you restart ngrok.

1. Start **Docker** or backend + frontend locally on port **5173**.
2. Install [ngrok](https://ngrok.com/download).
3. Run:

```powershell
ngrok http 5173
```

4. Copy the `https://xxxx.ngrok-free.app` URL and share it.
5. Add that URL to `.env` as `CORS_ORIGINS` and restart backend if not using Docker/nginx proxy.

---

## Production checklist

- [ ] Set strong `SECRET_KEY` in `.env`
- [ ] Set `GROQ_API_KEY` (Groq console)
- [ ] Set `FRONTEND_URL` and `CORS_ORIGINS` to your real public URL
- [ ] Use **Docker** (nginx + HTTPS) for a stable public site
- [ ] Optional: put **HTTPS** in front (Cloudflare, Nginx + Let’s Encrypt, university SSL)
- [ ] Do **not** commit `.env` to GitHub

---

## Docker URLs (after `docker compose up`)

| What | URL |
|------|-----|
| **App (share this)** | `http://SERVER_IP:5173` |
| API docs | `http://SERVER_IP:8000/docs` |
| Health | `http://SERVER_IP:8000/health` |

The frontend nginx proxies `/api` to the backend — users only need **one link** (port 5173).

---

## Need help?

- **Login fails for others:** check `CORS_ORIGINS` and `FRONTEND_URL` match the URL they use.
- **Chat fails:** check `GROQ_API_KEY` on the server.
- **Docker bus error on Windows:** allocate **8 GB+ RAM** to Docker Desktop; see main `README.md`.
