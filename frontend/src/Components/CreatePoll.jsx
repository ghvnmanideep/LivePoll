import React, { useState } from "react";
import { createPoll } from "../services/api";
import './CreatePoll.css';

export default function CreatePoll({ token, onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  function handleOptionChange(idx, value) {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  }

  function addOption() {
    setOptions([...options, ""]);
  }

  function removeOption(idx) {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsError(false);
    setMsg("");
    if (!question.trim()) {
      setIsError(true);
      setMsg("Poll question cannot be empty.");
      return;
    }
    const filteredOptions = options.map((o) => o.trim()).filter(Boolean);
    if (filteredOptions.length < 2) {
      setIsError(true);
      setMsg("Please add at least two options.");
      return;
    }
    try {
      await createPoll(token, question.trim(), filteredOptions);
      setMsg("Poll created successfully!");
      setQuestion("");
      setOptions(["", ""]);
      if (onPollCreated) onPollCreated();
    } catch (error) {
      setIsError(true);
      setMsg(error.message);
    }
  }

  return (
    <section aria-label="Create Poll">
      <div className="card createpoll-container" style={{ maxWidth: "600px", margin: "auto" }}>
        <h3>Create New Poll</h3>
        {msg && (
          <div className={isError ? "error-msg" : "success-msg"} role="alert">
            {msg}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Poll question"
            aria-label="Poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <div className="options-list">
            {options.map((opt, idx) => (
              <div key={idx} style={{ display: "flex", marginBottom: "12px", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  aria-label={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    aria-label={`Remove option ${idx + 1}`}
                    onClick={() => removeOption(idx)}
                    style={{
                      marginLeft: 14,
                      backgroundColor: "#b00020",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            style={{
              backgroundColor: "#2979ff",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "25px",
            }}
          >
            Add Option
          </button>
          <button type="submit" aria-label="Create Poll">
            Create Poll
          </button>
        </form>
      </div>
    </section>
  );
}
