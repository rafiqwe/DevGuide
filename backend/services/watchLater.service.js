const watchLaterModel = require("../models/watchlater.model");

module.exports.createWatchLater = async (userId, videoData) => {
  if (!userId || !videoData) {
    throw new Error("All fields are required");
  }
  try {
    const exists = await watchLaterModel.findOne({
      user: userId,
      videoId: videoData.videoId,
    });
    if (exists) throw new Error("watchLater already exists");

    const watchLater = await watchLaterModel.create({ user: userId, ...videoData });
    return watchLater;
  } catch (error) {
    console.log("Add watchLater error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getWatchLaterByUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId are required");
    }
    const watchLater = await watchLaterModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    return watchLater;
  } catch (error) {}
};

module.exports.deleteWatchLater = async (userId, videoId) => {
  const deleted = await watchLaterModel.findOneAndDelete({
    user: userId,
    videoId,
  });
  if (!deleted) throw new Error("watchLater not found");
  return deleted;
};

