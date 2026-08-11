/**
 * API base URL for fetch calls.
 * - Dev (unset): same origin — Vite proxies /api → http://127.0.0.1:8080 (no CORS issues).
 * - Prod / Docker: set VITE_API_BASE_URL (e.g. http://127.0.0.1:8080).
 */
const envUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL =
  envUrl !== undefined && envUrl !== "" ? envUrl : import.meta.env.DEV ? "" : "http://127.0.0.1:8080";
