// controllers/bookmarkController.js
const { validationResult } = require("express-validator");
const bookmarkService = require('../services/bookmark.service');

module.exports.addBookmark = async (req, res) => {

    
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const bookmark = await bookmarkService.createBookmark(req.user.id, req.body);
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getBookmarksByUser = async (req, res) => {
  try {
    const bookmarks = await bookmarkService.getBookmarksByUser(req.user.id);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
};

module.exports.deleteBookmark = async (req, res) => {
  const { videoId } = req.params;
  try {
    const deleted = await bookmarkService.deleteBookmark(req.user.id, videoId);
    res.json({ message: "Bookmark removed", deleted });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


