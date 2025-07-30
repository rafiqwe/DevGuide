import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import { formatViews, getTimeAgo } from "./SearchResults";
import { SkeletonCard } from "../components/SkeletonCard";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNextPage, setIsNextPage] = useState("");

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await API.get(`/api/playlist/list`, {
          params: { playlistId: id },
        });

        setPlaylist(res.data);
        setIsNextPage(res.data.nextPageToken);
        setVideos(res.data.formatted);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading playlist:", err);
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);


  const handleShowMoreBtn = async () => {
    try {
      const res = await API.get(`/api/playlist/list`, {
        params: { playlistId: id, pageToken: isNextPage },
      });

      // Append new videos to the existing list
      setVideos((prev) => [...prev, ...res.data.formatted]);

      // Update the nextPageToken for future loads
      setIsNextPage(res.data.nextPageToken || "");
    } catch (err) {
      console.error("Error loading more videos:", err);
    }
  };

  if (isLoading) {
    return (
      <div
        className="grid gap-8 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4
                      items-center w-full mx-auto"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load playlist.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {/* Header */}
      {/* <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full md:w-72 h-44 md:h-40 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">
            {playlist.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By{" "}
            <a
              href={`https://www.youtube.com/channel/${playlist.channelId}`}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {playlist.channelTitle}
            </a>
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
             videos • Updated {getTimeAgo(playlist.updatedAt)}
          </p>
        </div>
      </div> */}

      {/* Videos List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <Link to={`/watch/${video.videoId}`} className="block">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-49 object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs rounded px-2 py-0.5 opacity-80">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-md font-semibold dark:text-white line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {video.channelTitle}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatViews(video.views)} • {getTimeAgo(video.publishedAt)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {isNextPage && (
        <div className="mt-10 flex  justify-center items-center w-full mb-5 ">
          <button
            onClick={handleShowMoreBtn}
            className="bg-green-400 font-bold text-white rounded-2xl cursor-pointer py-3 px-8"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaylistDetails;
