const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlist.controller");
const { body, query } = require("express-validator");

router.post(
  "/",
  [
    body("playlistId")
      .isLength({ min: 3 })
      .withMessage("playlistId must be at least 3 characters long"),
  ],
  playlistController.addPlaylist
);

router.get("/", playlistController.getPlaylists);

router.get(
  "/list",
  [
    query("playlistId")
      .isString()
      .withMessage("playlistId must be a string")
      .isLength({ min: 3 })
      .withMessage("playlistId must be at least 3 characters"),
  ],
  playlistController.getSinglePlayList
);

module.exports = router;
