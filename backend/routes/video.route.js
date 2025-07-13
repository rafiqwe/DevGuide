const express = require("express");
const router = express.Router();
const { query } = require("express-validator");
const getVideos = require("../controllers/video.controller");


router.get(
  "/",
  [
    query("topic")
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("topic must be 3  characters long"),
  ],
  getVideos
); // /api/videos?query=react

module.exports = router;
