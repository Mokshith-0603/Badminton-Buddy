import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <-- Add this import
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Tournaments from "./pages/Tournaments";
import CourtBooking from "./pages/CourtBooking";

import "./index.css";

// Theme switch button component
function ThemeSwitch() {
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      className="theme-switch"
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      title="Toggle light/dark mode"
      style={{
        animation: "themeSwitchFadeIn 0.7s cubic-bezier(.4,2,.6,1) both"
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
          transform: dark ? "rotate(-20deg) scale(1.1)" : "rotate(0deg) scale(1)"
        }}
      >
        {dark ? "🌙" : "🌞"}
      </span>
    </button>
  );
}

// Add keyframes for fade-in animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes themeSwitchFadeIn {
  from { opacity: 0; transform: translateY(-20px);}
  to { opacity: 1; transform: translateY(0);}
}
`;
document.head.appendChild(style);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeSwitch />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
          <Route path="/tournaments" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><CourtBooking /></ProtectedRoute>} />
        </Routes>
        <Footer /> {/* <-- Add Footer here, after Routes */}
      </BrowserRouter>
    </AuthProvider>
  );
}