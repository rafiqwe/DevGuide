const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const watchLaterController = require("../controllers/watchLater.controller");

// POST /api/watchlater
router.post(
  "/",
  authMiddleware.auth,
  [
    body("videoId").isString().notEmpty().withMessage("videoId is requied"),
    body("title").isString().notEmpty().withMessage("title is requied"),
    body("thumbnail").isString().notEmpty().withMessage("thumbnail is requied"),
    body("channel").isString().notEmpty().withMessage("channel is requied"),
    body("duration").isString().notEmpty().withMessage("duration is requied"),
    body("description").optional().isString(),
    body("publishedAt")
      .optional()
      .isString()
      .withMessage("publishedAt is requied"),
  ],
  watchLaterController.addWatchLater
);

// GET /api/watchlater
router.get("/", authMiddleware.auth, watchLaterController.getWatchLater);

router.delete(
  "/:videoId",
  authMiddleware.auth,
  [param("videoId").isString().notEmpty()],
  watchLaterController.deleteWatchLater
);


module.exports = router;
