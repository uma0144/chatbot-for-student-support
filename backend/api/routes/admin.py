import os
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from backend.core.auth import get_current_user, require_admin
from backend.core.env import PROJECT_ROOT
from backend.database import crud
from backend.database.database import get_db

router = APIRouter()

PDF_DIR = PROJECT_ROOT / "knowledge-base" / "pdf"


@router.get("/stats")
def admin_stats(
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    users = crud.get_all_users(db)
    return {
        "users": len(users),
        "chat_messages": crud.count_all_chats(db),
        "tickets": crud.count_all_tickets(db),
        "students": sum(1 for u in users if u.role == "student"),
        "admins": sum(1 for u in users if u.role == "admin"),
    }


@router.get("/users")
def list_users(
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    users = crud.get_all_users(db)
    return [
        {"id": u.id, "name": u.name, "email": u.email, "role": u.role}
        for u in users
    ]


@router.post("/knowledge-base/pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    _admin=Depends(require_admin),
):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    PDF_DIR.mkdir(parents=True, exist_ok=True)
    safe_name = Path(file.filename).name
    dest = PDF_DIR / safe_name

    content = await file.read()
    if len(content) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="PDF must be under 15 MB.")

    dest.write_bytes(content)

    return {
        "message": f"Uploaded {safe_name}. Rebuild vector store to include in chat.",
        "filename": safe_name,
        "rebuild_command": "uv run python scripts/build_vectorstore.py",
    }


@router.get("/me")
def admin_me(current_user=Depends(get_current_user)):
    return current_user
