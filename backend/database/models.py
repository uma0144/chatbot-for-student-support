from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from backend.database.database import Base


def _utcnow():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False, index=True)

    password = Column(String, nullable=False)

    role = Column(String, default="student")

    chats = relationship(
        "ChatHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    tickets = relationship(
        "SupportTicket",
        back_populates="user",
        cascade="all, delete-orphan",
    )


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    question = Column(Text, nullable=False)

    answer = Column(Text, nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="chats",
    )


class SupportTicket(Base):
    __tablename__ = "support_tickets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    subject = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(20), default="open", nullable=False)
    created_at = Column(DateTime(timezone=True), default=_utcnow, nullable=False)

    user = relationship("User", back_populates="tickets")