const API = 'http://localhost:3000/api';

export async function register(username, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export async function getAllPolls(token) {
  const res = await fetch(`${API}/polls`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export async function createPoll(token, question, options) {
  const res = await fetch(`${API}/polls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, options }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

export async function votePoll(token, pollId, optionIndex) {
  const res = await fetch(`${API}/polls/${pollId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ optionIndex }),
  });
  if (!res.ok) {
    const errBody = await res.json();
    throw new Error(errBody.message || 'Vote failed');
  }
  return res.json();
}

export async function getPollResults(token, pollId) {
  const res = await fetch(`${API}/polls/${pollId}/results`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}
