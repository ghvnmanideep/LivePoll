import React, { useEffect, useState } from "react";
import { getAllPolls, votePoll, getPollResults } from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Pie chart components once
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Polls({ token, username }) {
  const [polls, setPolls] = useState([]);
  const [msg, setMsg] = useState("");
  const [results, setResults] = useState({});
  const [voted, setVoted] = useState({});

  useEffect(() => {
    if (!token) return;
    getAllPolls(token)
      .then(setPolls)
      .catch((e) => setMsg(e.message));
  }, [token]);

  async function castVote(pollId, optionIndex) {
    setMsg("");
    try {
      const updatedPoll = await votePoll(token, pollId, optionIndex);
      setPolls((prev) =>
        prev.map((p) => (p._id === pollId ? updatedPoll : p))
      );
      setVoted((prev) => ({ ...prev, [pollId]: true }));
      setMsg("Vote recorded!");
    } catch (e) {
      setMsg(e.message);
    }
  }

  async function toggleResults(pollId) {
    if (results[pollId]) {
      setResults((prev) => ({ ...prev, [pollId]: null }));
      return;
    }
    try {
      const pollData = await getPollResults(token, pollId);
      setResults((prev) => ({ ...prev, [pollId]: pollData }));
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <section aria-label="List of Polls">
      <h3>All Polls</h3>
      {msg && <div className={msg.includes("record") ? "success-msg" : "error-msg"}>{msg}</div>}
      {!polls.length && <p>No polls found.</p>}
      {polls.map((poll) => (
        <div key={poll._id} className="poll-card">
          <b>{poll.question}</b>
          <ul className="poll-options" role="list">
            {poll.options.map((opt, i) => (
              <li key={i} aria-label={`Option ${opt.text} with ${opt.votes} votes`}>
                <span>{opt.text}</span>
                {poll.voters.includes(username) || voted[poll._id] ? null : (
                  <button
                    onClick={() => castVote(poll._id, i)}
                    aria-label={`Vote for option ${opt.text}`}
                  >
                    Vote
                  </button>
                )}
                <span>({opt.votes} votes)</span>
              </li>
            ))}
          </ul>
          <button
            className="toggle-results"
            onClick={() => toggleResults(poll._id)}
            aria-expanded={!!results[poll._id]}
            aria-controls={`results-chart-${poll._id}`}
          >
            {results[poll._id] ? "Hide Results" : "Show Results"}
          </button>
          {results[poll._id] && (
            <div id={`results-chart-${poll._id}`} className="chart-container">
              <Pie
                key={poll._id}
                data={{
                  labels: results[poll._id].options.map((o) => o.text),
                  datasets: [
                    {
                      data: results[poll._id].options.map((o) => o.votes),
                      backgroundColor: [
                        "#2979ff",
                        "#5393ff",
                        "#bbdefb",
                        "#90caf9",
                        "#64b5f6",
                        "#42a5f5",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                    title: { display: true, text: poll.question },
                  },
                }}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
