const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.getVideos);

module.exports = router;
