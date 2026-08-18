from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

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
# CORS origins (production + local dev)
# ==========================

_DEFAULT_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://localhost:5176",
    "http://127.0.0.1:5176",
    "http://localhost:5177",
    "http://127.0.0.1:5177",
]

_extra_origins = os.getenv("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = list(
    dict.fromkeys(
        _DEFAULT_ORIGINS
        + [origin.strip() for origin in _extra_origins.split(",") if origin.strip()]
    )
)

# ==========================
# Create FastAPI App
# ==========================

app = FastAPI(
    title="AI Student Support Chatbot",
    description="AI-powered Student Support System using RAG + FastAPI + Groq",
    version="1.0.0",
)

# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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
    return {
        "status": "healthy"
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