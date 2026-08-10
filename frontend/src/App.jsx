import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("user_email");
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
      onLogin={(email) => setUser({ email })}
      onGoToRegister={() => setView("register")}
    />
  );
}

export default App;
