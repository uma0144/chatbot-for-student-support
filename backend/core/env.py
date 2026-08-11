"""Load environment variables from the repository root .env file."""

from pathlib import Path

from dotenv import load_dotenv

# backend/core/env.py -> repo root is two levels up
PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")
