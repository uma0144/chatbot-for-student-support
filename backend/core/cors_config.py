"""CORS settings for local dev and public deployment."""

import os


def _append_origins(origins: list[str], raw: str) -> None:
    for item in raw.split(","):
        origin = item.strip().rstrip("/")
        if origin and origin not in origins:
            origins.append(origin)


def get_cors_origins() -> list[str]:
    origins: list[str] = [
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    frontend_url = os.getenv("FRONTEND_URL", "").strip()
    if frontend_url:
        origins.append(frontend_url.rstrip("/"))

    # Render docs often use ALLOWED_ORIGINS; app also supports CORS_ORIGINS
    _append_origins(origins, os.getenv("ALLOWED_ORIGINS", ""))
    _append_origins(origins, os.getenv("CORS_ORIGINS", ""))

    return list(dict.fromkeys(origins))


def get_cors_origin_regex() -> str | None:
    if os.getenv("CORS_ALLOW_LOCALHOST", "true").lower() in ("1", "true", "yes"):
        return r"http://(localhost|127\.0\.0\.1):\d+"
    return None
