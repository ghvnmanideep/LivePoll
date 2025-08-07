import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-bg-overlay"></div>
      <div className="home-content">
        <img src="/icon.jpeg" alt="Live Poll Logo" className="logo" />
        <h1 className="home-title">Live Poll</h1>
        <p className="home-subtitle">
          Engage your audience in real-time!<br />
          Create, join, and vote in live polls instantly.
        </p>
        <div className="home-btn-row">
          <button className="home-btn" onClick={() => navigate("/create")}>
            Create Poll
          </button>
          <button className="home-btn register" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="home-btn doctor" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="home-btn doctor" onClick={() => navigate("/polls")}>
            Live Polls Top
          </button>
          <p>No Signup Required</p>
        </div>
      </div>
    </div>
  );
}
