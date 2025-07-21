const playlistModel = require("../models/playlist.model");
const playListModel = require("../models/playlist.model");
const axios = require("axios");

module.exports.addPlaylist = async ({ playlistId, apiKey, tags }) => {
  try {
    if (!playlistId || !apiKey) {
      throw new Error({ message: "playlist Id or apiKey required" });
    }

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`;

    const response = await axios.get(playlistUrl);
    const playlist = response.data.items[0];

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const { title, thumbnails, channelId, channelTitle } = playlist.snippet;

    // Save to DB
    const saved = await playListModel.create({
      playlistId,
      title,
      thumbnail: thumbnails.high?.url || thumbnails.medium?.url,
      channelId,
      channelTitle,
      tags,
    });

    return saved;
  } catch (error) {
    console.error("Failed to add playlist:", error.message);
  }
};

module.exports.getPlaylists = async () => {
  try {
    const playlists = await playlistModel.find().sort({
      createdAt: -1,
    });
    return playlists;
  } catch (error) {
    console.log("Playlist service error:", error.message);
  }
};
