import React, { useState } from "react";
import { register } from "../services/api";

export default function Register({ onLogin, setView }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters long.");
      return;
    }
    try {
      const res = await register(username, password);
      onLogin(res.token, res.username);
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (
    <div className="app-container">
      <div className="card register-card">
        <h2>Register</h2>
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" aria-label="Register">
            Register
          </button>
        </form>
        <button className="button-link" onClick={() => setView("login")}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
