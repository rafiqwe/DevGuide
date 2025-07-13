// controllers/videoController.js
const axios = require("axios");
const { validationResult } = require("express-validator");

const getVideos = async (req, res) => {
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { query } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 12,
          key: apiKey,
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
    }));

    res.json(videos);
  } catch (err) {
    console.error("YouTube API error", err.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

module.exports = getVideos;
