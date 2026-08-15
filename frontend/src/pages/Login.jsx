import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../config";
import AuthLayout from "../components/AuthLayout";
import { ITM } from "../theme";

export default function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const raw = await response.text();
      let data = {};
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error(
            "Backend returned an invalid response. Is the API running on port 8081?"
          );
        }
      } else if (!response.ok) {
        throw new Error(
          `Cannot reach the API (HTTP ${response.status}). Start the backend: uv run uvicorn backend.main:app --host 127.0.0.1 --port 8081 --reload`
        );
      }

      if (!response.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("user_email", data.email || email.trim());
      localStorage.setItem("user_name", data.name || "");
      localStorage.setItem("user_id", String(data.id ?? ""));
      localStorage.setItem("user_role", data.role || "student");
      onLogin({
        id: data.id,
        name: data.name,
        email: data.email || email.trim(),
        role: data.role,
      });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access student support"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <button type="button" className="itm-link" onClick={onGoToRegister}>
            Sign up
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "18px" }}>
          <label className="itm-label">Username or Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="student@itmuniversity.ac.in"
            autoComplete="email"
            className="itm-input"
          />
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label className="itm-label">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="itm-input"
              style={{ paddingRight: "48px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: ITM.muted,
                cursor: "pointer",
                padding: "4px",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <button type="button" className="itm-link" style={{ fontSize: "12px" }}>
            Forgot password?
          </button>
        </div>

        {error && (
          <p
            style={{
              color: ITM.error,
              fontSize: "13px",
              marginBottom: "16px",
              padding: "10px 14px",
              background: "#fef2f2",
              borderRadius: ITM.radiusSm,
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="itm-btn-gold-login">
          {loading ? "Signing in..." : "Log In"}
        </button>
      </form>
    </AuthLayout>
  );
}
