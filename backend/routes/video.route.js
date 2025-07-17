const express = require("express");
const router = express.Router();
const { query, param } = require("express-validator");
const videoController = require("../controllers/video.controller");

router.get(
  "/",
  [
    query("topic")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Topic must be at least 3 characters"),
  ],
  videoController.getVideos
); // /api/videos?query=react

router.get(
  "/single/:videoId",
  [
    param("videoId")
      .isString()
      .isLength({ min: 3 })
      .withMessage("video Id  must be at least 3 characters"),
  ],
  videoController.getSingleVideo
);

module.exports = router;
