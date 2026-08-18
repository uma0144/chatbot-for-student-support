# 🎓 Student Support Chatbot

> An AI-powered Student Support Chatbot that answers university-related questions using **Retrieval-Augmented Generation (RAG)**, **LangChain**, **FAISS**, **Groq**, **FastAPI**, and **React**.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![LangChain](https://img.shields.io/badge/LangChain-RAG-orange)
![FAISS](https://img.shields.io/badge/VectorDB-FAISS-red)
![Groq](https://img.shields.io/badge/LLM-Groq-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

# 📖 Overview

The **Student Support Chatbot** is an AI-powered virtual assistant developed to help students quickly access university information such as admissions, academic regulations, examinations, notices, departments, and FAQs.

Instead of searching through multiple documents, students can ask questions in natural language and receive accurate, context-aware responses generated using a Retrieval-Augmented Generation (RAG) pipeline.

---

# ✨ Features

* 🤖 AI-powered chatbot using **Groq (Llama 3.3 70B)**
* 📚 Retrieval-Augmented Generation (RAG)
* 🔎 Semantic search with FAISS Vector Database
* ⚡ FastAPI REST API
* 🎨 Modern React frontend
* 🔐 User Registration & Login
* 📂 Knowledge Base from CSV & JSON
* 💬 Natural language question answering
* 🗃️ SQLite database
* 🚀 Modular project architecture

---

# 🏗️ System Architecture

```text
                Student
                   │
                   ▼
           React Frontend
                   │
          REST API Request
                   │
                   ▼
            FastAPI Backend
                   │
        Authentication Module
                   │
                   ▼
          LangChain RAG Engine
                   │
      Retrieve Relevant Documents
                   │
                   ▼
          FAISS Vector Database
                   │
         Retrieved Context
                   │
                   ▼
       Groq (Llama 3.3 70B)
                   │
         AI Generated Response
                   │
                   ▼
          React User Interface
```

---

# 🧠 RAG Workflow

```text
Student Question
        │
        ▼
Retrieve Similar Documents
        │
        ▼
FAISS Vector Search
        │
        ▼
Relevant Context
        │
        ▼
LangChain Prompt
        │
        ▼
Llama 3.3 70B (Groq)
        │
        ▼
Final Answer
```

---

# 🛠️ Technology Stack

## Frontend

* React
* JavaScript
* Axios
* HTML5
* CSS3

## Backend

* FastAPI
* Python
* SQLAlchemy
* SQLite
* Pydantic

## Artificial Intelligence

* LangChain
* Groq
* Llama 3.3 70B
* HuggingFace Embeddings
* FAISS

---

## 📂 Project Structure

```text
Student-Support-Chatbot/
│
├── ai_engine/
│   ├── llm/
│   │   └── llm_model.py
│   │
│   ├── rag/
│   │   ├── loader.py
│   │   ├── splitter.py
│   │   ├── retriever.py
│   │   ├── vectorstore.py
│   │   ├── prompt.py
│   │   └── rag_chain.py
│   │
│   └── embeddings/
│       └── embedding_model.py
│
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth.py
│   │       ├── chatbot.py
│   │       └── users.py
│   │
│   ├── chatbot/
│   │   ├── __init__.py
│   │   └── chatbot_service.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   │
│   ├── database/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── crud.py
│   │
│   ├── models/
│   │   └── __init__.py
│   │
│   ├── services/
│   │   └── __init__.py
│   │
│   └── main.py
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Message.jsx
│   │   │   └── MessageInput.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── knowledge-base/
│   ├── csv/
│   │   ├── itm_chatbot_chunks.csv
│   │   └── *.csv
│   │
│   ├── md/
│   │   ├── 01_about.md
│   │   ├── 02_graduate_programmes.md
│   │   ├── 03_admissions_faq.md
│   │   └── *.md
│   │
│   └── json/
│       ├── faqs.json
│       ├── notices.json
│       ├── reference_links.json
│       ├── itm_chatbot_chunks.json
│       └── *.json
│
├── scripts/
│   ├── ingest.py
│   ├── train.py
│   ├── evaluate.py
│   └── run.py
│
├── storage/
│   ├── chat_history/
│   ├── uploads/
│   ├── trained_models/
│   └── vector_db/
│       ├── index.faiss
│       └── index.pkl
│
├── tests/
│   ├── test_api.py
│   ├── test_chatbot.py
│   └── test_rag.py
│
├── requirements.txt
├── student_chatbot.db
├── .gitignore
├── LICENSE
└── README.md
```

### 📁 Directory Description

| Folder                 | Description                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| **ai_engine/**         | Contains the RAG pipeline, embeddings, retriever, prompt templates, and LLM integration.    |
| **backend/**           | FastAPI backend including APIs, authentication, database operations, and chatbot services.  |
| **frontend/**          | React application providing the user interface for students.                                |
| **knowledge-base/**    | CSV, JSON, and Markdown files containing university information, FAQs, notices, and chatbot knowledge. |
| **scripts/**           | Utility scripts for ingestion, training, evaluation, and running the chatbot.               |
| **storage/**           | Stores FAISS vector database, uploaded files, trained models, and chat history.             |
| **tests/**             | Unit and integration tests for the API, chatbot, and RAG pipeline.                          |
| **student_chatbot.db** | SQLite database for storing user and application data.                                      |
| **requirements.txt**   | Python dependencies required for the project.                                               |
| **README.md**          | Project documentation and setup guide.                                                      |


---

# ⚡ Quick Start (Local)

You need **two servers** running:

| Part | URL | Command |
| --- | --- | --- |
| **Backend** (API) | http://localhost:8000 | `uvicorn backend.main:app --reload` |
| **Frontend** (UI) | http://localhost:5173 | `cd frontend && npm run dev` |

### One-time setup

```bash
git clone https://github.com/uma0144/chatbot-for-student-support.git
cd chatbot-for-student-support
cp .env.example .env
# Edit .env → set GROQ_API_KEY from https://console.groq.com

pip install -r requirements.txt
python .cursor/scripts/build_vectorstore.py

cd frontend && npm install && cd ..
```

### Run (two terminals)

**Terminal 1 — backend:**
```bash
uvicorn backend.main:app --reload
```

**Terminal 2 — frontend:**
```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** → Register → Login → Chat.

**Or one command (Linux/macOS):**
```bash
chmod +x scripts/run-local.sh
./scripts/run-local.sh
```

Test backend: http://localhost:8000/health → `{"status":"healthy"}`

---

# 🆓 Deploy for FREE (Render + Vercel)

| Service | Host | Cost | URL you get |
| --- | --- | --- | --- |
| **Backend** | [Render](https://render.com) | Free | `https://your-api.onrender.com` |
| **Frontend** | [Vercel](https://vercel.com) | Free | `https://your-app.vercel.app` |
| **AI (Groq)** | [Groq Console](https://console.groq.com) | Free tier | API key only |

### Step 1 — Backend on Render (free)

1. Sign up at https://render.com with GitHub.
2. **New** → **Web Service** → repo `uma0144/chatbot-for-student-support`.
3. Settings:

| Field | Value |
| --- | --- |
| Build Command | `pip install -r requirements.txt && python .cursor/scripts/build_vectorstore.py` |
| Start Command | `uvicorn backend.main:app --host 0.0.0.0 --port $PORT` |

4. Environment variables:

| Key | Value |
| --- | --- |
| `GROQ_API_KEY` | your Groq key |
| `SECRET_KEY` | any long random string |

5. Deploy → copy URL e.g. `https://chatbot-for-student-support-2.onrender.com`
6. Test: `https://YOUR-URL.onrender.com/health`

### Step 2 — Frontend on Vercel (free)

1. Sign up at https://vercel.com with GitHub.
2. **Add New** → **Project** → import `chatbot-for-student-support`.
3. **Before Deploy**, click **Edit** on Root Directory → set to `frontend`.
4. **Framework Preset** → **Vite**.
5. **Build & Development Settings** — turn OFF overrides or set exactly:
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Do **NOT** use `cd frontend` (Root Directory is already `frontend`).
6. Environment variable:

| Key | Value |
| --- | --- |
| `VITE_API_BASE_URL` | `https://chatbot-for-student-support-4.onrender.com` |

7. **Deploy** → copy Vercel URL.

### Step 3 — Connect them

On Render → **Environment** → add:

```text
ALLOWED_ORIGINS=https://your-vercel-url.vercel.app
```

Save (Render redeploys). Open your **Vercel URL** → Register → Login → Chat.

**Share with HOD:** your Vercel URL (the public chatbot link).

---

## Clone Repository

```bash
git clone https://github.com/uma0144/chatbot-for-student-support.git

cd chatbot-for-student-support
```

---

## Create Virtual Environment

```bash
python -m venv .venv
```

---

## Activate Environment

### Windows

```bash
.venv\Scripts\activate
```

### Linux

```bash
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🤖 Configure Groq API

Get a free API key from [Groq Console](https://console.groq.com).

Copy the environment file and add your key:

```bash
cp .env.example .env
```

Set in `.env`:

```bash
GROQ_API_KEY=your_groq_api_key_here
LLM_MODEL=llama-3.3-70b-versatile
TEMPERATURE=0.2
```

---

# ▶️ Run Backend

```bash
uvicorn backend.main:app --reload
```

Runs on

```
http://localhost:8000
```

---

# ▶️ Run Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🐳 Run with Docker

Requires [Docker Desktop](https://docs.docker.com/get-docker/) (Windows: enable WSL2).

### 1. Clone and configure

```bash
git clone https://github.com/uma0144/chatbot-for-student-support.git
cd chatbot-for-student-support
cp .env.example .env
```

Edit `.env` and set:

- `GROQ_API_KEY` — required for chat (https://console.groq.com/)
- `SECRET_KEY` — use a long random string for production

### 2. Build and run

```bash
docker compose up --build
```

First start may take several minutes (embeddings model + FAISS index build).

| Service | URL |
| --- | --- |
| **App (login + chat)** | http://localhost:5173 |
| **API / Swagger** | http://localhost:8000/docs |
| **Health** | http://localhost:8000/health |

The frontend is a **production build** served by nginx. API calls use `/api` on the same port (proxied to the backend).

### 3. Stop

```bash
docker compose down
```

Data persists in Docker volumes: `chatbot-data` (SQLite), `vector-db` (FAISS).

### 4. Rebuild after knowledge-base changes

```bash
docker compose down
docker volume rm chatbot-for-student-support_vector-db
docker compose up --build
```

### Windows (PowerShell)

```powershell
cd F:\chatbot-for-student-support
copy .env.example .env
notepad .env
docker compose up --build
```

Open http://localhost:5173

### 5. Deploy for everyone (public / LAN)

See **[docs/DEPLOY.md](docs/DEPLOY.md)** for:

- Docker on a cloud server (recommended)
- Sharing on the same Wi‑Fi / campus network
- Temporary public link with ngrok

---

# 🌐 Deploy to Production

## Option A — One server (Docker, recommended for demo/VPS)

Runs frontend + backend on **one URL** (nginx serves the app and proxies `/api` to FastAPI).

```bash
cp .env.example .env
# Set GROQ_API_KEY and a strong SECRET_KEY in .env

docker compose -f docker-compose.prod.yml up --build -d
```

| Service | URL |
| --- | --- |
| App (login + chat) | http://localhost (port 80) |
| Health check | http://localhost/health |

Stop:

```bash
docker compose -f docker-compose.prod.yml down
```

Deploy on a VPS (DigitalOcean, AWS EC2, college server): open port 80, point your domain DNS to the server IP.

---

## Option B — Free cloud (Render + Vercel)

**Backend on Render**

1. Push this repo to GitHub.
2. Go to [Render](https://render.com) → **New** → **Blueprint** → connect repo (uses `render.yaml`).
3. Set environment variables:
   - `GROQ_API_KEY` — your Groq API key
   - `ALLOWED_ORIGINS` — your Vercel URL, e.g. `https://your-app.vercel.app`
4. After deploy, copy the backend URL, e.g. `https://itm-chatbot-api.onrender.com`.

**Frontend on Vercel**

1. Go to [Vercel](https://vercel.com) → **Import** → select this repo.
2. Set **Root Directory** to `frontend`.
3. Add environment variable:
   - `VITE_API_BASE_URL` = your Render backend URL (no trailing slash)
4. Deploy. Your chatbot URL will be e.g. `https://your-app.vercel.app`.

**Test backend:** `https://your-backend.onrender.com/health` should return `{"status":"healthy"}`.

---

## Required environment variables (production)

| Variable | Required | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | Groq API key from [console.groq.com](https://console.groq.com) |
| `SECRET_KEY` | Yes | Random secret for JWT (change from default) |
| `ALLOWED_ORIGINS` | For split deploy | Comma-separated frontend URLs for CORS |
| `VITE_API_BASE_URL` | For Vercel | Backend URL at build time |

---

# 📚 Knowledge Base

The chatbot retrieves information from:

* University FAQs
* Academic Information
* Notices
* Departments
* Admission Details
* CSV Documents
* JSON Documents

---

# 🔐 Authentication

* Student Registration
* Student Login
* Secure Authentication
* Database Storage

---

# 📸 Screenshots

Add screenshots here:

* Home Page
* Login Page
* Register Page
* Chat Interface
* AI Response
* Admin Dashboard (Optional)

Example:

```
docs/
 ├── home.png
 ├── login.png
 ├── register.png
 ├── chatbot.png
```

---

# 🚀 Future Scope

* PDF Knowledge Base
* Voice Chat
* Speech-to-Text
* Text-to-Speech
* Admin Dashboard
* Multi-language Support
* Chat History
* Email Notifications
* Cloud Deployment
* Docker Support
* JWT Authentication
* Role-Based Access Control

---

# 📈 Project Highlights

✔ Retrieval-Augmented Generation (RAG)

✔ Groq Cloud LLM (Llama 3.3 70B)

✔ Semantic Search

✔ AI-powered Question Answering

✔ Full Stack Development

✔ FastAPI REST APIs

✔ React Frontend

✔ Authentication System

✔ Vector Database

---

# 👨‍💻 Author

**K. Uma Maheswar**

B.Tech – Artificial Intelligence & Machine Learning

ITM University

GitHub: https://github.com/uma0144

---
.
