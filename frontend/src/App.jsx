import { useState, useEffect, useCallback } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { API_BASE_URL } from "./config";
import { clearSession, setOnUnauthorized } from "./services/session";

function readStoredUser() {
  const email = localStorage.getItem("user_email");
  if (!email) return null;
  return {
    id: localStorage.getItem("user_id"),
    name: localStorage.getItem("user_name") || "",
    email,
    role: localStorage.getItem("user_role") || "student",
  };
}

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [booting, setBooting] = useState(true);

  const handleLogout = useCallback(() => {
    clearSession();
    setUser(null);
    setView("login");
  }, []);

  useEffect(() => {
    setOnUnauthorized(handleLogout);
    return () => setOnUnauthorized(null);
  }, [handleLogout]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const stored = readStoredUser();

    if (!token || !stored?.email) {
      setBooting(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/portal/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          setUser(stored);
        } else {
          clearSession();
        }
      })
      .catch(() => {
        // Backend down — still show UI; chat will show connection errors
        setUser(stored);
      })
      .finally(() => setBooting(false));
  }, []);

  if (booting) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Loading…
      </div>
    );
  }

  // Step 2: chatbot only after successful login/register
  if (user) {
    return <Home user={user} onLogout={handleLogout} />;
  }

  // Step 1: login (or register) — no chat UI
  if (view === "register") {
    return (
      <Register
        onRegister={(newUser) => setUser(newUser)}
        onGoToLogin={() => setView("login")}
      />
    );
  }

  return (
    <Login
      onLogin={(userData) => setUser(userData)}
      onGoToRegister={() => setView("register")}
    />
  );
}

export default App;
