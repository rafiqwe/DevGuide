const axios = require("axios");
const { validationResult } = require("express-validator");
const videoService = require("../services/video.service");
const channelUtils = require("../utils/channels.util");

module.exports.getVideos = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const topic = req.query.topic;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    // 1. Search videos (long only)
    const searchRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: topic,
          type: "video",
          videoDuration: "long",
          maxResults: 20,
          key: apiKey,
        },
      }
    );

    const videoIds = searchRes.data.items.map((item) => item.id.videoId);
    const channelIds = searchRes.data.items.map(
      (item) => item.snippet.channelId
    );

    // 2. Get video details (views, duration)
    const videoRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics,contentDetails",
          id: videoIds.join(","),
          key: apiKey,
        },
      }
    );

    // 3. Get channel icons
    // const Id = [...new Set(channelIds)].join(",");

    // const channelRes = await channelUtils.channelIcon({ Id, apiKey });

    const channelRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id: [...new Set(channelIds)].join(","),
          key: apiKey,
        },
      }
    );

    const channelIconMap = {};
    channelRes.data.items.forEach((channel) => {
      channelIconMap[channel.id] = channel.snippet.thumbnails.default.url;
    });

    const videos = videoRes.data.items.map((video) => {
      const { id, snippet, statistics, contentDetails } = video;
      return {
        videoId: id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.high.url,
        channelTitle: snippet.channelTitle,
        channelId: snippet.channelId,
        channelIcon: channelIconMap[snippet.channelId] || null,
        publishedAt: snippet.publishedAt,
        views: statistics.viewCount,
        duration: parseISO8601(contentDetails.duration),
      };
    });

    res.json(videos);
  } catch (err) {
    console.error("YouTube API error:", err.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// Format ISO 8601 duration (e.g., PT1H20M35S → 1:20:35)
const parseISO8601 = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const h = match[1] ? match[1].replace("H", "") : "0";
  const m = match[2] ? match[2].replace("M", "") : "0";
  const s = match[3] ? match[3].replace("S", "") : "0";
  return `${h !== "0" ? h + ":" : ""}${m.padStart(2, "0")}:${s.padStart(
    2,
    "0"
  )}`;
};

module.exports.getSingleVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { videoId } = req.params;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    // 1. Fetch video details
    const videoRes = await videoService.getSingleVideo({ videoId, apiKey });
    const item = videoRes.data.items?.[0];

    if (!item) {
      return res.status(404).json({ error: "Video not found" });
    }

    const { snippet, statistics, contentDetails } = item;
    const channelId = snippet.channelId;

    // 2. Fetch channel details
    const channelRes = await channelUtils.channelIcon({
      Id: channelId,
      apiKey,
    });

    // 3. Construct response object
    const videoDetails = {
      videoId: item.id,
      title: snippet.title,
      description: snippet.description,
      channelTitle: snippet.channelTitle,
      channelId,
      thumbnail: snippet.thumbnails.high.url,
      publishedAt: snippet.publishedAt,
      views: statistics?.viewCount || 0,
      channelIcon: channelRes.icon,
      subscribers: channelRes.subscribers,
      duration: parseISO8601(contentDetails.duration),
    };

    res.status(200).json(videoDetails);
  } catch (err) {
    console.error("Error fetching single video:", err.message);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
};
