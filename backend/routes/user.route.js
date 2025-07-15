const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");
const upload = require("../middlewares/upload");
router.get("/", (req, res) => {
  res.send("Hello  user route from DevGuide Backend");
});

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.auth, userController.getUserProfile);
router.post(
  "/change-profile",
  authMiddleware.auth,
  upload.single("image"),
  userController.changeProfile
);
router.get("/logout", authMiddleware.auth, userController.logoutUser);

router.get("/profile-image", authMiddleware.auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.image) {
      return res.status(404).send("Image not found");
    }

    const buffer = Buffer.from(user.image);
    res.set("Content-Type", "image/jpeg"); // adjust if using png/webp/etc.
    res.send(buffer);
  } catch (err) {
    console.error("Image fetch error:", err);
    res.status(500).send("Error loading image");
  }
});

module.exports = router;
