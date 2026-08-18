import os

from backend.core.env import PROJECT_ROOT  # loads repo-root .env on import


def get_groq_api_key() -> str | None:
    key = os.getenv("GROQ_API_KEY")
    if key and key.strip():
        return key.strip()
    return None


def require_groq_api_key() -> str:
    key = get_groq_api_key()
    if not key:
        raise RuntimeError(
            "GROQ_API_KEY is not set. Create "
            f"{PROJECT_ROOT / '.env'} with your key from https://console.groq.com/"
        )
    return key
