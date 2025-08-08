require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/polls", require("./routes/polls"));

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port", process.env.PORT || 3000)
);
