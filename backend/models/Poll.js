const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  voters: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Poll", pollSchema);
