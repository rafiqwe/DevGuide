const axios = require("axios");

module.exports.channelIcon = async ({ Id, apiKey }) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics",
          id: Id,
          key: apiKey,
        },
      }
    );

    const channel = response.data.items[0];

    if (!channel) {
      return {
        icon: "",
        subscribers: "Unknown",
      };
    }

    return {
      icon: channel.snippet?.thumbnails?.default?.url || "",
      subscribers: channel.statistics?.subscriberCount || "Unknown",
    };
  } catch (error) {
    console.log("ChannelRes Utils Error:", error.message);
    return {
      icon: "",
      subscribers: "Unknown",
    };
  }
};
