import React, { useState } from "react";
import { login } from "../services/api";
import "../index.css";

export default function Login({ onLogin, setView }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await login(username, password);
      onLogin(res.token, res.username);
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (
    <div className="app-container">
      <div className="card login-card">
        <h2>Login</h2>
        {msg && <div className="error-msg">{msg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" aria-label="Log in">
            Log In
          </button>
        </form>
        <button className="button-link" onClick={() => setView("register")}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}
