const { validationResult } = require("express-validator");
const watchLaterService = require("../services/watchLater.service");

module.exports.addWatchLater = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  console.log(req.body);

  try {
    const watchLater = await watchLaterService.createWatchLater(
      req.user.id,
      req.body
    );
    res.status(201).json(watchLater);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getWatchLater = async (req, res) => {
  try {
    const watchLater = await watchLaterService.getWatchLaterByUser(req.user.id);
    res.status(200).json(watchLater);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchLaters" });
  }
};

module.exports.deleteWatchLater = async (req, res) => {
  const { videoId } = req.params;
  try {
    const deleted = await watchLaterService.deleteWatchLater(
      req.user.id,
      videoId
    );
    res.json({ message: "watchLater removed", deleted });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
