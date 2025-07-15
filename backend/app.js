const cors = require("cors");
require("dotenv").config();
const express = require("express");
const videoRoutes = require("./routes/video.route");
const userRoute = require("./routes/user.route");
const bookMarkRoute = require("./routes/bookMark.route");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  res.send("Hello from DevGuide backend!");
});

app.use("/user", userRoute);
app.use("/api/videos", videoRoutes);
app.use("/api/bookmark", bookMarkRoute);

module.exports = app;
