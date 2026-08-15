import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Use 8081 when 8080 is blocked on Windows; override in .env.local
  const backendUrl =
    env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:8081";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
