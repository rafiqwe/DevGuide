const axios = require("axios");
module.exports.getSingleVideo = async ({ videoId, apiKey }) => {
  try {
    const videoRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: "snippet,statistics,contentDetails",
          id: videoId,
          key: apiKey,
        },
      }
    );

    return videoRes;
  } catch (error) {
    console.log("video service error:", error);
  }
};
