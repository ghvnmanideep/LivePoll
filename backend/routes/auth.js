const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) return res.status(400).json({ message: "Username and password required" });
    if (await User.findOne({ username })) return res.status(409).json({ message: "Username already exists" });
    const passwordHash = await User.hashPassword(password);
    const user = new User({ username, passwordHash });
    await user.save();
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);
    res.json({ token, username });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);
    res.json({ token, username });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
