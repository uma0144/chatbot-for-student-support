/**
 * Backend API base URL (no trailing slash).
 * - Local dev: empty string → Vite proxies /api to backend (vite.config.js).
 * - Vercel: set VITE_API_BASE_URL at build time, or uses Render default below.
 */
const RENDER_API_URL = "https://chatbot-for-student-support-4.onrender.com";

function normalizeApiBaseUrl(raw) {
  if (raw === undefined || raw === null) return "";
  let url = String(raw).trim();
  if (!url) return "";
  if (url.startsWith("ttps://")) {
    url = `h${url}`;
  }
  return url.replace(/\/$/, "");
}

const envUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const API_BASE_URL =
  envUrl !== ""
    ? envUrl
    : import.meta.env.DEV
      ? ""
      : RENDER_API_URL;
