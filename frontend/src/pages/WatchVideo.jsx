// src/pages/WatchVideo.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { formatViews, getTimeAgo } from "./SearchResults";
import { HiClock } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa";
import VideoSkeleton from "../components/VideoSkeleton";
import { useQuery } from "@tanstack/react-query";

const WatchVideo = () => {
  const { videoId } = useParams();
  const [seeMore, setSeeMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token");

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/api/videos/single/${videoId}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  };

  const { data } = useQuery({
    queryKey: ["getSingleVideo", videoId],
    queryFn: fetchVideo,
  });

  const video = data;

  const formatSubscribers = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B subscribers";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M subscribers";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K subscribers";
    return num + " subscribers";
  };

  const handleAddWatchLater = async () => {
    try {
      const res = await API.post(
        `/api/watchlater`,
        {
          title: video.title,
          videoId,
          thumbnail: video.thumbnail,
          channel: video.channelId,
          description: video.description,
          publishedAt: video.publishedAt,
          duration: video.duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.log("Add WatchLater error", error);
    }
  };

  const handleBookMark = async () => {
    try {
      const res = await API.post(
        `/api/bookmark`,
        {
          title: video.title,
          videoId,
          thumbnail: video.thumbnail,
          channel: video.channelId,
          description: video.description,
          publishedAt: video.publishedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Add Book Mark error", error);
    }
  };

  if (!video) {
    return (
      <div className="w-full">
        <VideoSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 mt-6 max-w-6xl mx-auto w-full ">
        {/* Video Player */}
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow mb-6">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Title + Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-white">
            {video.title}
          </h1>
          <div className="flex gap-3">
            <button
              title="Watch Later"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={handleAddWatchLater}
            >
              <HiClock className="text-xl text-gray-700 dark:text-white" />
            </button>
            <button
              title="Bookmark"
              onClick={handleBookMark}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaBookmark className="text-xl text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Channel Info + Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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

        {/* {} /* Description */}
        <div className="bg-gray-100 dark:bg-gray-800 px-3 sm:px-4 py-3 rounded-lg mb-12 w-full transition-all">
          <p
            className={`text-sm sm:text-base text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words transition-all duration-300 ease-in-out ${
              seeMore ? "max-h-[100%]" : "line-clamp-3"
            }`}
            style={{ wordBreak: "break-word" }}
          >
            {video.description}
          </p>

          {/* Show toggle only if long text */}
          {video.description.length > 150 && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setSeeMore((prev) => !prev)}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
              >
                {seeMore ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-20 right-6 z-50">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow animate-slide-in-out">
            ✅ Added to Watch Later
          </div>
        </div>
      )}
    </>
  );
};

export default WatchVideo;
