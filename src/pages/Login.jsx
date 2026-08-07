  import { useState } from "react";
  import { GraduationCap, Eye, EyeOff } from "lucide-react";

  const API_URL = "http://127.0.0.1:8001/api/auth/login";

  export default function Login({ onLogin }) {
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

      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Login failed");
        }

        // Save JWT Token
        localStorage.setItem("access_token", data.access_token);

        // Save User Email
        localStorage.setItem("user_email", email.trim());

        // Go to Home Page
        onLogin(email.trim());

      } catch (err) {
        setError(err.message);
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

            {/* Logo */}
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
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl text-[16px] outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                    style={{
                      padding: "14px 48px 14px 20px",
                      boxSizing: "border-box",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
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
                  className="text-red-500 text-sm"
                  style={{ marginBottom: "12px" }}
                >
                  {error}
                </p>
              )}

              {/* Remember Me */}
              <div
                className="flex items-center justify-between text-[15px]"
                style={{ marginBottom: "24px" }}
              >
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-indigo-600 font-medium hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[16px] font-semibold transition shadow-md shadow-indigo-200 disabled:opacity-60"
                style={{ padding: "14px" }}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

            </form>

            {/* Footer */}
            <p
              className="text-center text-[15px] text-gray-500"
              style={{ marginTop: "28px" }}
            >
              Don't have an account?{" "}
              <button
                type="button"
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