import os

from dotenv import load_dotenv

load_dotenv()


def get_groq_api_key() -> str | None:
    key = os.getenv("GROQ_API_KEY")
    if key and key.strip():
        return key.strip()
    return None


def require_groq_api_key() -> str:
    key = get_groq_api_key()
    if not key:
        raise RuntimeError(
            "GROQ_API_KEY is not set. Add it to the project .env file "
            "(get a free key at https://console.groq.com/)."
        )
    return key
