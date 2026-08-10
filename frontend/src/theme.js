/** ITM University official theme (Prototype D) */
export const ITM = {
  navy: "#1e3a5f",
  navyDark: "#152a45",
  navyMid: "#234b73",
  gold: "#f59e0b",
  goldLight: "#fbbf24",
  goldPale: "#fffbeb",
  maroon: "#9B1B30",
  bg: "#f0f4f8",
  surface: "#f8fafc",
  text: "#334155",
  muted: "#64748b",
  border: "#e2e8f0",
  white: "#ffffff",
  success: "#22c55e",
  error: "#dc2626",
  shadowSm: "0 1px 3px rgba(30, 58, 95, 0.08)",
  shadowMd: "0 4px 20px rgba(30, 58, 95, 0.12)",
  shadowLg: "0 12px 40px rgba(30, 58, 95, 0.18)",
  radius: "12px",
  radiusSm: "8px",
  radiusFull: "999px",
};

export function formatMessageTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
