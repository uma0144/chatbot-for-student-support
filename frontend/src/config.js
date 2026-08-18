/**
 * API base URL for fetch calls.
 * - Dev (unset): same origin — Vite proxies /api → backend (see vite.config.js).
 * - Vercel/Render: set VITE_API_BASE_URL to your backend URL at build time.
 */
const envUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL =
  envUrl !== undefined && envUrl !== ""
    ? envUrl
    : import.meta.env.DEV
      ? ""
      : "";
