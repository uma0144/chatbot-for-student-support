<<<<<<< HEAD
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
=======
/**
 * API base URL for fetch calls.
 * - Dev (unset): same origin — Vite proxies /api → backend (default 8081 in vite.config.js).
 * - Dev/prod: set VITE_API_BASE_URL in .env.local (UTF-8), e.g. http://127.0.0.1:8081
 */
const envUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL =
  envUrl !== undefined && envUrl !== "" ? envUrl : import.meta.env.DEV ? "" : "http://127.0.0.1:8081";
>>>>>>> cursor/chatgpt-streaming-0ee7
