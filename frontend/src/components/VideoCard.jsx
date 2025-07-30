// src/components/VideoCard.jsx
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { formatViews, getTimeAgo } from "../pages/SearchResults";

const VideoCard = ({ video }) => {
  return (
    // your actual card content
    <div className="w-full max-w-sm sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] flex flex-col">
      {/* Thumbnail */}
      <Link
        to={`/watch/${video.videoId}`}
        className="relative group rounded-xl overflow-hidden"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </Link>

      {/* Video Info */}
      <div className="flex mt-3 gap-3">
        <img
          src={video.channelIcon}
          alt={video.channelName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col text-sm overflow-hidden">
          <Link
            to={`/watch/${video.videoId}`}
            className="font-medium line-clamp-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            {video.title}
          </Link>
          <a
            href={`https://www.youtube.com/channel/${video.channelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm"
          >
            {video.channelTitle}
          </a>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatViews(video.views)} • {getTimeAgo(video.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;





