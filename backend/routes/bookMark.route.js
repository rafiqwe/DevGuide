// routes/bookmarkRoutes.js
const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const bookmarkController = require("../controllers/bookMark.controller");

// POST /api/bookmarks
router.post(
  "/",
  authMiddleware.auth,
  [
    body("videoId").isString().notEmpty().withMessage("videoId is requied"),
    body("title").isString().notEmpty().withMessage("title is requied"),
    body("thumbnail").isString().notEmpty().withMessage("thumbnail is requied"),
    body("channel").isString().notEmpty().withMessage("channel is requied"),
    body("description").optional().isString(),
    body("publishedAt")
      .optional()
      .isString()
      .withMessage("publishedAt is requied"),
  ],
  bookmarkController.addBookmark
);

// GET /api/bookmarks
router.get("/", authMiddleware.auth, bookmarkController.getBookmarksByUser);

// // DELETE /api/bookmarks/:videoId
router.delete(
  "/:videoId",
  authMiddleware.auth,
  [param("videoId").isString().notEmpty()],
  bookmarkController.deleteBookmark
);


module.exports = router;
