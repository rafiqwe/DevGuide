const mongoose = require("mongoose");

const bookMarkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    title: String,
    thumbnail: String,
    channel: String,
    description: String,
    publishedAt: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookmark", bookMarkSchema);
