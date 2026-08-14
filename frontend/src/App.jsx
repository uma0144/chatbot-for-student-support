import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

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

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const stored = readStoredUser();
    if (token && stored?.email) {
      setUser(stored);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    setUser(null);
    setView("login");
  };

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
