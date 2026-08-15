from sqlalchemy.orm import Session

from backend.database.models import User, ChatHistory, SupportTicket
from backend.core.security import hash_password


# ==========================
# User CRUD Operations
# ==========================

def create_user(
    db: Session,
    name: str,
    email: str,
    password: str,
):

    hashed_password = hash_password(password)

    user = User(
        name=name,
        email=email,
        password=hashed_password,
        role="student",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(
    db: Session,
    email: str,
):

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int,
):

    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def get_all_users(
    db: Session,
):

    return db.query(User).all()


def delete_user(
    db: Session,
    user_id: int,
):

    user = get_user_by_id(db, user_id)

    if user is None:
        return None

    db.delete(user)
    db.commit()

    return user


# ==========================
# Chat History CRUD
# ==========================

def save_chat(
    db: Session,
    user_id: int,
    question: str,
    answer: str,
):

    chat = ChatHistory(
        user_id=user_id,
        question=question,
        answer=answer,
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def get_chat_history(
    db: Session,
    user_id: int,
):

    return (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.id.desc())
        .all()
    )


def get_chat_by_id(
    db: Session,
    chat_id: int,
):

    return (
        db.query(ChatHistory)
        .filter(ChatHistory.id == chat_id)
        .first()
    )


def delete_chat(
    db: Session,
    chat_id: int,
):

    chat = get_chat_by_id(db, chat_id)

    if chat is None:
        return None

    db.delete(chat)
    db.commit()

    return chat


def delete_all_user_chats(
    db: Session,
    user_id: int,
):

    chats = (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .all()
    )

    for chat in chats:
        db.delete(chat)

    db.commit()

    return len(chats)


def clear_chat_history(db: Session, user_id: int) -> int:
    """Alias used by chat routes."""
    return delete_all_user_chats(db, user_id)


def count_users(db: Session) -> int:
    return db.query(User).count()


def count_all_chats(db: Session) -> int:
    return db.query(ChatHistory).count()


def count_all_tickets(db: Session) -> int:
    return db.query(SupportTicket).count()


# ==========================
# Support Ticket CRUD
# ==========================

def _ticket_to_dict(ticket: SupportTicket) -> dict:
    return {
        "id": ticket.id,
        "subject": ticket.subject,
        "description": ticket.description,
        "status": ticket.status,
        "created_at": ticket.created_at.isoformat() if ticket.created_at else None,
    }


def create_ticket(
    db: Session,
    user_id: int,
    subject: str,
    description: str,
):
    ticket = SupportTicket(
        user_id=user_id,
        subject=subject,
        description=description,
        status="open",
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return _ticket_to_dict(ticket)


def get_user_tickets(db: Session, user_id: int) -> list[dict]:
    tickets = (
        db.query(SupportTicket)
        .filter(SupportTicket.user_id == user_id)
        .order_by(SupportTicket.id.desc())
        .all()
    )
    return [_ticket_to_dict(t) for t in tickets]