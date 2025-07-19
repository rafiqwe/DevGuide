// src/pages/WatchVideo.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { formatViews, getTimeAgo } from "./SearchResults";
import { HiClock } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa";

const WatchVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/api/videos/single/${videoId}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Error fetching video details:", err);
      }
    };
    fetchVideo();
  }, [videoId]);

  const formatSubscribers = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B subscribers";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M subscribers";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K subscribers";
    return num + " subscribers";
  };

  if (!video) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading video...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 mt-7 mb-90 md:px-8 max-w-6xl h-screen mx-auto">
      {/* Video player */}
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-6">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={video.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Title + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold dark:text-white">
          {video.title}
        </h1>
        <div className="flex gap-4">
          <button
            title="Watch Later"
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <HiClock className="text-xl  text-gray-700 dark:text-white" />
          </button>
          <button
            title="Bookmark"
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FaBookmark className="text-xl text-gray-700 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Channel + Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <a
          href={`https://www.youtube.com/channel/${video.channelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img
            src={video.channelIcon}
            alt={video.channelTitle}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800 dark:text-white">
              {video.channelTitle}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatSubscribers(video.subscribers)}
            </p>
          </div>
        </a>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <HiClock className="text-lg" />
          <span>
            {formatViews(video.views)} • {getTimeAgo(video.publishedAt)}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg transition-all mb-10">
        <p
          className={`text-gray-700 dark:text-gray-200 whitespace-pre-wrap transition-all duration-300 ${
            seeMore ? "" : "line-clamp-3"
          }`}
        >
          {video.description}
        </p>
        <button
          onClick={() => setSeeMore((prev) => !prev)}
          className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {seeMore ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default WatchVideo;
