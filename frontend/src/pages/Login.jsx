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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("user_email", email.trim());
      onLogin(email.trim());
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Student Support Portal"
      subtitle="Sign in to continue"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onGoToRegister}
            style={{
              color: ITM.navy,
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label className="itm-label">Email ID</label>
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

        <div style={{ marginBottom: "16px" }}>
          <label className="itm-label">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              autoComplete="current-password"
              className="itm-input"
              style={{ paddingRight: "44px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: ITM.muted,
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>
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
