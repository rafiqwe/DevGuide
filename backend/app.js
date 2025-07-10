// backend/app.js
require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get("/", (req, res) => {
  res.send("Hello from DevGuide backend!");
});

module.exports = app;
