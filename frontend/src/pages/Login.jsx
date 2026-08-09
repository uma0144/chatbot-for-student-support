import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../config";

export default function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      // Send login request to FastAPI
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      // Store JWT token
      localStorage.setItem("access_token", data.access_token);

      // Store token type
      localStorage.setItem("token_type", data.token_type);

      // Store user email
      localStorage.setItem("user_email", email.trim());

      console.log("Login successful");
      console.log("Token:", data.access_token);

      // Tell parent component login was successful
      onLogin(email.trim());

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-md">

        <div
          className="bg-white rounded-3xl shadow-sm"
          style={{ padding: "40px" }}
        >

          {/* Header */}
          <div
            className="flex flex-col items-center"
            style={{ marginBottom: "36px" }}
          >
            <div
              className="rounded-2xl bg-indigo-50 flex items-center justify-center"
              style={{
                width: "64px",
                height: "64px",
                marginBottom: "20px",
              }}
            >
              <GraduationCap
                size={30}
                className="text-indigo-600"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back
            </h1>

            <p
              className="text-gray-500 text-[15px]"
              style={{ marginTop: "6px" }}
            >
              Log in to Student AI
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                className="block text-sm font-semibold text-gray-700"
                style={{ marginBottom: "8px" }}
              >
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@college.edu"
                autoComplete="email"
                className="w-full border border-gray-200 rounded-2xl text-[16px] outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                style={{
                  padding: "14px 20px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                className="block text-sm font-semibold text-gray-700"
                style={{ marginBottom: "8px" }}
              >
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full border border-gray-200 rounded-2xl text-[16px] outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                  style={{
                    padding: "14px 48px 14px 20px",
                    boxSizing: "border-box",
                  }}
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((v) => !v)
                  }
                  className="absolute text-gray-400 hover:text-gray-600 transition"
                  style={{
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-sm text-red-500"
                style={{ marginBottom: "12px" }}
              >
                {error}
              </p>
            )}

            {/* Remember / Forgot */}
            <div
              className="flex items-center justify-between text-[15px]"
              style={{ marginBottom: "24px" }}
            >

              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-indigo-600 font-medium hover:text-indigo-700 transition"
              >
                Forgot password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl text-[16px] font-semibold transition shadow-md shadow-indigo-200"
              style={{ padding: "14px" }}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

          </form>

          {/* Signup */}
          <p
            className="text-center text-[15px] text-gray-500"
            style={{ marginTop: "28px" }}
          >
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onGoToRegister}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
