const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const noteRoutes = require("./routes/note.js");
const userRoutes = require("./routes/user.js");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);
 
 
// Error Handling Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ from: "ErrorHandling Mid", error: message });
});

// catch-all middleware
app.use("*", (req, res, next) => {
  res.sendStatus(404);
});

module.exports = { app };
