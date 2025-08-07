import React, { useEffect, useState } from "react";
import { getAllPolls, getPollResults } from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register necessary chart elements (important)
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Results({ token }) {
  const [polls, setPolls] = useState([]);
  const [results, setResults] = useState({});
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    getAllPolls(token)
      .then(setPolls)
      .catch((e) => {
        setMsg(e.message);
        setError(true);
      });
  }, [token]);

  async function toggleChart(pollId) {
    if (results[pollId]) {
      setResults((prev) => ({ ...prev, [pollId]: null }));
      return;
    }
    try {
      const data = await getPollResults(token, pollId);
      setResults((prev) => ({ ...prev, [pollId]: data }));
      setMsg("");
      setError(false);
    } catch (e) {
      setMsg(e.message);
      setError(true);
    }
  }

  return (
    <section aria-label="Poll Results" style={{ maxWidth: 900, margin: "40px auto", padding: "0 25px" }}>
      <h2>Results</h2>
      {msg && (
        <div className={error ? "error-msg" : "success-msg"} role="alert" style={{ maxWidth: 600, margin: "0 auto 30px" }}>
          {msg}
        </div>
      )}
      {!polls.length && !msg && (
        <p style={{ textAlign: "center", fontSize: "1.1rem" }}>No polls available.</p>
      )}
      {polls.map((poll) => (
        <div
          key={poll._id}
          className="poll-card"
          style={{ marginBottom: 40, padding: 20, backgroundColor: "#212121", borderRadius: 12, boxShadow: "0 3px 16px rgba(0,0,0,0.6)" }}
        >
          <div
            className="question"
            style={{ fontWeight: "700", fontSize: "1.25rem", color: "#5393ff", marginBottom: 24 }}
          >
            {poll.question}
          </div>
          <button
            className="toggle-chart"
            onClick={() => toggleChart(poll._id)}
            aria-expanded={!!results[poll._id]}
            aria-controls={`chart-${poll._id}`}
            style={{
              background: "none",
              border: "none",
              color: "#5393ff",
              cursor: "pointer",
              marginBottom: 24,
              fontWeight: "600",
              fontSize: "1rem",
              textDecoration: "underline",
            }}
          >
            {results[poll._id] ? "Hide Chart" : "Show Chart"}
          </button>
          {results[poll._id] && (
            <div
              id={`chart-${poll._id}`}
              className="chart-container"
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              <Pie
                key={poll._id}
                data={{
                  labels: results[poll._id].options.map((opt) => opt.text),
                  datasets: [
                    {
                      data: results[poll._id].options.map((opt) => opt.votes),
                      backgroundColor: [
                        "#5393ff",
                        "#7ea7ff",
                        "#2f55ff",
                        "#1a37ff",
                        "#7fbfff",
                        "#4188ff",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "bottom", labels: { color: "#e0e0e0" }},
                    title: { display: false },
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
