"""CORS settings for local dev and public deployment."""

import os


def get_cors_origins() -> list[str]:
    origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    frontend_url = os.getenv("FRONTEND_URL", "").strip()
    if frontend_url:
        origins.append(frontend_url.rstrip("/"))

    extra = os.getenv("CORS_ORIGINS", "").strip()
    if extra:
        for item in extra.split(","):
            origin = item.strip().rstrip("/")
            if origin and origin not in origins:
                origins.append(origin)

    return origins


def get_cors_origin_regex() -> str | None:
    # Local dev: any localhost port (Vite uses 5173+)
    if os.getenv("CORS_ALLOW_LOCALHOST", "true").lower() in ("1", "true", "yes"):
        return r"http://(localhost|127\.0\.0\.1):\d+"
    return None
