//playlist service
const playlistModel = require("../models/playlist.model");
const playListModel = require("../models/playlist.model");
const axios = require("axios");

module.exports.addPlaylist = async ({ playlistId, apiKey, tags }) => {
  try {
    if (!playlistId || !apiKey) {
      throw new Error({ message: "playlist Id or apiKey required" });
    }

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`;

    const response = await axios.get(playlistUrl);
    const playlist = response.data.items[0];

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const { title, thumbnails, channelId, channelTitle } = playlist.snippet;

    // Save to DB
    const saved = await playListModel.create({
      playlistId,
      title,
      thumbnail: thumbnails.high?.url || thumbnails.medium?.url,
      channelId,
      channelTitle,
      tags,
    });

    return saved;
  } catch (error) {
    console.error("Failed to add playlist:", error.message);
  }
};

module.exports.getPlaylists = async () => {
  try {
    const playlists = await playlistModel.find().sort({
      createdAt: -1,
    });
    return playlists;
  } catch (error) {
    console.log("Playlist service error:", error.message);
  }
};

// format duration parse to time
function parseISO8601(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || "0H").replace("H", "");
  const minutes = (match[2] || "0M").replace("M", "");
  const seconds = (match[3] || "0S").replace("S", "");

  if (hours !== "0") {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.padStart(2, "0")}`;
  }
}

module.exports.getSinglePlayList = async ({ playlistId, pageToken = "" }) => {
  if (!playlistId) {
    throw new Error("playlist ID is required");
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    // Step 1: Fetch playlist items (paginated)
    const playlistRes = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: 20,
        pageToken,
        key: apiKey,
      },
    });

    const items = playlistRes.data.items;
    const nextPageToken = playlistRes.data.nextPageToken || null;

    const videoIds = items
      .map((item) => item.contentDetails?.videoId)
      .filter(Boolean);

    if (!videoIds.length) {
      return { formatted: [], nextPageToken: null };
    }

    // Step 2: Get video stats
    const videoRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videoIds.join(","),
        key: apiKey,
      },
    });

    const durationMap = {};
    const viewsMap = {};
    videoRes.data.items.forEach((video) => {
      durationMap[video.id] = video.contentDetails.duration;
      viewsMap[video.id] = video.statistics?.viewCount;
    });

    // Step 3: Format result
    const formatted = items.map((item) => {
      const snippet = item.snippet;
      const videoId = item.contentDetails?.videoId;
      return {
        title: snippet.title,
        thumbnail: snippet.thumbnails?.high?.url || "",
        videoId,
        views: viewsMap[videoId] || "",
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        duration: parseISO8601(durationMap[videoId] || ""),
      };
    });

    return {
      formatted,
      nextPageToken,
    };
  } catch (error) {
    console.error("getSinglePlaylist fetching error:", error.message);
    throw new Error("Failed to fetch playlist with duration");
  }
};
