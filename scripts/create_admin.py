#!/usr/bin/env python3
"""
Create or promote an admin user for the ITM Student Support chatbot.

Usage:
  uv run python scripts/create_admin.py --email admin@itmuniversity.ac.in --password YourSecurePass --name "ITM Admin"

If the email already exists, the user's role is set to admin.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.database.database import SessionLocal, engine, Base
from backend.database import crud
from backend.database.models import User  # noqa: F401 — register models


def main() -> None:
    parser = argparse.ArgumentParser(description="Create or promote an admin user")
    parser.add_argument("--email", required=True, help="Admin email address")
    parser.add_argument("--password", required=True, help="Admin password")
    parser.add_argument("--name", default="Admin", help="Display name")
    args = parser.parse_args()

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        user = crud.get_user_by_email(db, args.email.strip().lower())
        if user:
            user.role = "admin"
            if args.name:
                user.name = args.name
            db.commit()
            print(f"Updated existing user {user.email} to role=admin (id={user.id})")
        else:
            user = crud.create_user(db, args.name, args.email.strip().lower(), args.password)
            user.role = "admin"
            db.commit()
            print(f"Created admin user {user.email} (id={user.id})")
    finally:
        db.close()


if __name__ == "__main__":
    main()
