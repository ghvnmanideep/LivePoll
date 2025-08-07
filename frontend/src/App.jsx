import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import './App.css';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [view, setView] = useState(token ? "dashboard" : "login");

  function onLogin(token, username) {
    setToken(token);
    setUsername(username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setView("dashboard");
  }

  function onLogout() {
    setToken("");
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setView("login");
  }

  return (
    <>
      {view === "login" && <Login onLogin={onLogin} setView={setView} />}
      {view === "register" && <Register onLogin={onLogin} setView={setView} />}
      {view === "dashboard" && (
        <Dashboard token={token} username={username} onLogout={onLogout} />
      )}
    </>
  );
}
