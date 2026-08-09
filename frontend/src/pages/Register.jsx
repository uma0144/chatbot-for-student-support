import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../config";

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

      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to create account.");
      }

      // If your backend logs the user in immediately on register and
      // returns a token, store it the same way Login.jsx does:
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_type", data.token_type || "bearer");
        localStorage.setItem("user_email", email.trim());
        onRegister({ name: name.trim(), email: email.trim() });
      } else {
        // No token returned — account was created, but the user still
        // needs to log in separately.
        onGoToLogin();
      }

      console.log("Registration successful");

    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm" style={{ padding: "40px" }}>
          <div className="flex flex-col items-center" style={{ marginBottom: "36px" }}>
            <div
              className="rounded-2xl bg-indigo-50 flex items-center justify-center"
              style={{ width: "64px", height: "64px", marginBottom: "20px" }}
            >
              <GraduationCap size={30} className="text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create account</h1>
            <p className="text-gray-500 text-[15px]" style={{ marginTop: "6px" }}>
              Sign up for Student AI
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: "8px" }}>
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Your name"
                autoComplete="name"
                className="w-full border border-gray-200 rounded-2xl text-[16px] outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                style={{ padding: "14px 20px", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: "8px" }}>
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
                style={{ padding: "14px 20px", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: "8px" }}>
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
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="w-full border border-gray-200 rounded-2xl text-[16px] outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                  style={{ padding: "14px 48px 14px 20px", boxSizing: "border-box" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute text-gray-400 hover:text-gray-600 transition"
                  style={{ right: "16px", top: "50%", transform: "translateY(-50%)" }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: "8px" }}>
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-2xl text-[16px] outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                style={{ padding: "14px 20px", boxSizing: "border-box" }}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500" style={{ marginBottom: "16px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl text-[16px] font-semibold transition shadow-md shadow-indigo-200"
              style={{ padding: "14px" }}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-center text-[15px] text-gray-500" style={{ marginTop: "28px" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
