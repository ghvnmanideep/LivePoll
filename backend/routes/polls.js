const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");
const auth = require("../middleware/auth");
//get all polls
router.get("/", auth, async (req, res) => {
  const polls = await Poll.find({}).sort("-_id");
  res.json(polls);
});
//create poll
router.post("/", auth, async (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || options.length < 2)
    return res.status(400).json({ message: "Question and at least 2 options required" });
  const poll = await Poll.create({
    question,
    options: options.map(text => ({ text })),
    createdBy: req.user.id,
  });
  res.json(poll);
});
//poll a vote
router.post("/:id/vote", auth, async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });
  if (poll.voters.includes(req.user.id)) return res.status(403).json({ message: "Already voted" });
  poll.options[req.body.optionIndex].votes += 1;
  poll.voters.push(req.user.id);
  await poll.save();
  res.json(poll);
});
//results
router.get("/:id/results", auth, async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });
  res.json(poll);
});

module.exports = router;
