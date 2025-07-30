const axios = require("axios");

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

const keywords = [
  "programming videos in fullstack",
  "react js frontend",
  "web development frontend backend",
  "frontend",
  "javascript",
  "html css ",
  "gsap animation ",
  " framer motion animation",
  "frontend tools",
  "github dsa",
  "node js",
  "python",
  "full stack dev",
  "typescript",
  "python",
];

module.exports.getVideos = async (req, res) => {
  const topic = keywords[Math.floor(Math.random() * keywords.length)];
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

    res.status(200).json(videos);
  } catch (err) {
    console.error("Home YouTube API error:", err.message);
    res.status(500).json({ error: "Failed to fetch Home videos" });
  }
};
