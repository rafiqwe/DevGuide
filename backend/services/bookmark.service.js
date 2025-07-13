const BookmarkModel = require("../models/bookmark.model");

module.exports.createBookmark = async (userId, videoData) => {
  if (!userId || !videoData) {
    throw new Error("All fields are required");
  }
  try {
    const exists = await BookmarkModel.findOne({
      user: userId,
      videoId: videoData.videoId,
    });
    if (exists) throw new Error("Bookmark already exists");

    const bookmark = await BookmarkModel.create({ user: userId, ...videoData });
    return bookmark;
  } catch (error) {
    console.log("Add bookmark error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getBookmarksByUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId are required");
    }
    const bookmarks = await BookmarkModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    return bookmarks;
  } catch (error) {}
};

module.exports.deleteBookmark = async (userId, videoId) => {
  const deleted = await BookmarkModel.findOneAndDelete({
    user: userId,
    videoId,
  });
  if (!deleted) throw new Error("Bookmark not found");
  return deleted;
};

