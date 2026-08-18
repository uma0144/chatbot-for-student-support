// Vercel/Render: set VITE_API_BASE_URL to your backend URL at build time
// Production (Docker/nginx): empty = same-origin /api via nginx proxy
// Local dev: defaults to http://127.0.0.1:8000
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined &&
  import.meta.env.VITE_API_BASE_URL !== ""
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.DEV
      ? "http://127.0.0.1:8000"
      : "";
