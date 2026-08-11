from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ==========================
# Database
# ==========================

from backend.database.database import Base, engine
import backend.database.models

# ==========================
# API Routes
# ==========================

from backend.api.routes.chat import router as chat_router
from backend.api.routes.auth import router as auth_router
from backend.api.routes.admin import router as admin_router

# ==========================
# Create Database Tables
# ==========================

Base.metadata.create_all(bind=engine)

# ==========================
# Create FastAPI App
# ==========================

app = FastAPI(
    title="AI Student Support Chatbot",
    description="AI-powered Student Support System using RAG + FastAPI + Ollama",
    version="1.0.0",
)

# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    # Any localhost port (Vite picks 5173+ when ports are in use)
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Root Endpoint
# ==========================

@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Student Support Chatbot",
        "version": "1.0.0",
        "status": "Running"
    }

# ==========================
# Health Check
# ==========================

@app.get("/health")
async def health():
    from backend.core.groq_config import get_groq_api_key

    return {
        "status": "healthy",
        "groq_configured": bool(get_groq_api_key()),
    }

# ==========================
# Register Routers
# ==========================

app.include_router(auth_router)

app.include_router(
    chat_router,
    prefix="/api/chat",
    tags=["Chat"]
)

app.include_router(
    admin_router,
    prefix="/api/admin",
    tags=["Admin"]
)