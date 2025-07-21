const { validationResult } = require("express-validator");
const playListService = require("../services/playlist.service");
const playlistModel = require("../models/playlist.model");

module.exports.addPlaylist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { playlistId, tags = [] } = req.body;
  const apiKey = process.env.YOUTUBE_API_KEY;

  const playlistIsExist = await playlistModel.findOne({ playlistId });

  if (playlistIsExist) {
    return res.status(400).json({ errors: "Playlist is already Exist " });
  }

  try {
    const savedPlaylist = await playListService.addPlaylist({
      playlistId,
      apiKey,
      tags,
    });

    return res.status(200).json(savedPlaylist);
  } catch (error) {
    console.error("Failed to add playlist:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await playListService.getPlaylists();
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchLaters" });
  }
};
