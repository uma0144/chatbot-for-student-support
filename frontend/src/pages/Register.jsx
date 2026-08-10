import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../config";
import AuthLayout from "../components/AuthLayout";
import { ITM } from "../theme";

export default function Register({ onRegister, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to create account.");
      }

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_type", data.token_type || "bearer");
        localStorage.setItem("user_email", email.trim());
        onRegister({ name: name.trim(), email: email.trim() });
      } else {
        onGoToLogin();
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Student Account"
      subtitle="Register for the support portal"
      footer={
        <>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onGoToLogin}
            style={{
              color: ITM.navy,
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label className="itm-label">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Your name"
            autoComplete="name"
            className="itm-input"
          />
        </div>

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
              placeholder="At least 6 characters"
              autoComplete="new-password"
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

        <div style={{ marginBottom: "16px" }}>
          <label className="itm-label">Confirm password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            placeholder="Re-enter password"
            autoComplete="new-password"
            className="itm-input"
          />
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="itm-btn-primary">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
