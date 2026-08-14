from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from backend.core.auth import get_current_user
from backend.database.database import get_db
from backend.database import crud
from backend.services.knowledge_service import (
    get_topic,
    list_topics,
    load_faqs,
    load_notices,
)

router = APIRouter()


@router.get("/knowledge-base")
def knowledge_base_topics(current_user=Depends(get_current_user)):
    del current_user
    return {"topics": list_topics()}


@router.get("/knowledge-base/{topic_id}")
def knowledge_base_topic(topic_id: str, current_user=Depends(get_current_user)):
    del current_user
    topic = get_topic(topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic


@router.get("/faqs")
def faqs(current_user=Depends(get_current_user)):
    del current_user
    items = load_faqs()
    categories: dict[str, list[dict]] = {}
    for item in items:
        cat = item.get("category", "General")
        categories.setdefault(cat, []).append(item)
    return {"categories": categories, "total": len(items)}


@router.get("/notices")
def notices(limit: int = 15, current_user=Depends(get_current_user)):
    del current_user
    return {"notices": load_notices(limit=limit)}


class TicketCreate(BaseModel):
    subject: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=4000)


@router.get("/tickets")
def list_tickets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return {
        "tickets": crud.get_user_tickets(db, current_user["id"]),
    }


@router.post("/tickets", status_code=201)
def create_ticket(
    payload: TicketCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    ticket = crud.create_ticket(
        db=db,
        user_id=current_user["id"],
        subject=payload.subject.strip(),
        description=payload.description.strip(),
    )
    return ticket


@router.get("/profile")
def profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user = crud.get_user_by_id(db, current_user["id"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    chats = crud.get_chat_history(db, user.id)
    tickets = crud.get_user_tickets(db, user.id)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "stats": {
            "chat_messages": len(chats),
            "open_tickets": sum(1 for t in tickets if t["status"] == "open"),
            "total_tickets": len(tickets),
        },
    }
