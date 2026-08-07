import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // "login" | "register"

  if (!user) {
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

  return <Home user={user} onLogout={() => { setUser(null); setView("login"); }} />;
}

export default App;