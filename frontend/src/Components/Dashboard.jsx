import React, { useState } from "react";
import CreatePoll from "./CreatePoll";
import Polls from "./Polls";
import Results from "./Results";
import './Dashboard.css';

export default function Dashboard({ token, username, onLogout }) {
  const [tab, setTab] = useState("polls");

  return (
    <>
      <nav className="dashboard-nav" role="navigation" aria-label="Main dashboard navigation">
  <span className="logo" aria-live="polite">
    LivePollApp
  </span>

  <button
    className={tab === "polls" ? "active" : ""}
    onClick={() => setTab("polls")}
    aria-current={tab === "polls" ? "page" : undefined}
    aria-label="View Polls"
  >
    Polls
  </button>
  <button
    className={tab === "create" ? "active" : ""}
    onClick={() => setTab("create")}
    aria-current={tab === "create" ? "page" : undefined}
    aria-label="Create Poll"
  >
    Create Poll
  </button>
  <button
    className={tab === "results" ? "active" : ""}
    onClick={() => setTab("results")}
    aria-current={tab === "results" ? "page" : undefined}
    aria-label="View Results"
  >
    Results
  </button>

  <span style={{ marginLeft: "auto", userSelect: "none", fontWeight: 600 }}>
    Hi, {username}{" "}
    <button onClick={onLogout} aria-label="Logout">
      Logout
    </button>
  </span>
</nav>

      <main className="dashboard-content">
        {tab === "polls" && <Polls token={token} username={username} />}
        {tab === "create" && <CreatePoll token={token} />}
        {tab === "results" && <Results token={token} />}
      </main>
    </>
  );
}
