// Production (Docker/nginx): empty = same-origin /api via nginx proxy
// Development: local FastAPI on port 8000
// Cloud split deploy: set VITE_API_BASE_URL to your backend URL (e.g. Render)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined &&
  import.meta.env.VITE_API_BASE_URL !== ""
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.DEV
      ? "http://127.0.0.1:8000"
      : "";
