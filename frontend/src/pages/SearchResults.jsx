// src/pages/SearchResults.jsx
import React, { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { Link } from "react-router-dom";

export const formatViews = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B views";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M views";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K views";
  return num + " views";
};

export const getTimeAgo = (dateString) => {
  const published = new Date(dateString);
  const now = new Date();
  const diffInMs = now - published;
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

  if (diffInMonths < 1) {
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays <= 1 ? "1 day ago" : `${diffInDays} days ago`;
  }

  if (diffInMonths < 12) {
    return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
};

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 ml-17 dark:text-gray-400 text-lg">
        No results found.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {searchResults.map((video) => (
          <div className="flex flex-col sm:flex-row gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-xl transition">
            {/* Thumbnail with duration */}
            <Link to={`/watch/${video.videoId}`} key={video.videoId}>
              <div className="relative w-full sm:w-[360px] h-[200px] sm:h-[200px] shrink-0 overflow-hidden rounded-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
            </Link>

            {/* Video info */}
            <div className="flex flex-col gap-3 flex-1">
              <Link to={`/watch/${video.videoId}`} key={video.videoId}>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">
                    {video.title}
                  </h2>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatViews(video.views)} views •{" "}
                    {getTimeAgo(video.publishedAt)}
                  </div>
                </div>
              </Link>
              <a
                href={`https://www.youtube.com/channel/${video.channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 "
              >
                <div className="flex items-center gap-3 mt-3">
                  {video.channelIcon && (
                    <img
                      src={video.channelIcon}
                      alt={video.channelTitle}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  )}
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <div className="font-medium">{video.channelTitle}</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
