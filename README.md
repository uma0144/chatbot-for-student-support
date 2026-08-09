# 🎓 Student Support Chatbot

> An AI-powered Student Support Chatbot that answers university-related questions using **Retrieval-Augmented Generation (RAG)**, **LangChain**, **FAISS**, **Ollama**, **FastAPI**, and **React**.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![LangChain](https://img.shields.io/badge/LangChain-RAG-orange)
![FAISS](https://img.shields.io/badge/VectorDB-FAISS-red)
![Ollama](https://img.shields.io/badge/LLM-Llama3.2-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

# 📖 Overview

The **Student Support Chatbot** is an AI-powered virtual assistant developed to help students quickly access university information such as admissions, academic regulations, examinations, notices, departments, and FAQs.

Instead of searching through multiple documents, students can ask questions in natural language and receive accurate, context-aware responses generated using a Retrieval-Augmented Generation (RAG) pipeline.

---

# ✨ Features

* 🤖 AI-powered chatbot using **Llama 3.2**
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
       Ollama (Llama 3.2 Model)
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
Llama 3.2 (Ollama)
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
* Ollama
* Llama 3.2
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
| **knowledge-base/**    | CSV and JSON files containing university information, FAQs, notices, and chatbot knowledge. |
| **scripts/**           | Utility scripts for ingestion, training, evaluation, and running the chatbot.               |
| **storage/**           | Stores FAISS vector database, uploaded files, trained models, and chat history.             |
| **tests/**             | Unit and integration tests for the API, chatbot, and RAG pipeline.                          |
| **student_chatbot.db** | SQLite database for storing user and application data.                                      |
| **requirements.txt**   | Python dependencies required for the project.                                               |
| **README.md**          | Project documentation and setup guide.                                                      |


---

# 🚀 Installation

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

# 🤖 Install Ollama

Download Ollama

https://ollama.com

Pull the model

```bash
ollama pull llama3.2
```

Verify

```bash
ollama list
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

Requires [Docker](https://docs.docker.com/get-docker/) and Docker Compose.

```bash
cp .env.example .env
# Edit .env and set GROQ_API_KEY

docker compose up --build
```

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Health check | http://localhost:8000/health |

Stop containers:

```bash
docker compose down
```

Data is persisted in Docker volumes (`chatbot-data` for SQLite, `vector-db` for FAISS).

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

✔ Local Large Language Model

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
