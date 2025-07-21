const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    playlistId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
    },
    channelTitle: {
      type: String,
    },
    tags: {
      type: [String], // <-- Add this field
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Playlist", playlistSchema);
