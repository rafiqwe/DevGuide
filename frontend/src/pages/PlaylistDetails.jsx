import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import { formatViews, getTimeAgo } from "./SearchResults";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await API.get(`/api/playlist/list`, {
          params: { playlistId: id },
        });
        
        setPlaylist(res.data);
        setVideos(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading playlist:", err);
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-300">
        Loading playlist...
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
          <div
            key={video.videoId}
            className="bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <Link to={`/watch/${video.videoId}`} className="block">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
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
    </div>
  );
};

export default PlaylistDetails;






//  useEffect(() => {
//     const fetchData = async () => {
//       const res = await API.get("/api/playlist/list", {
//         params: {
//           playlistId: id,
//         },
//       });

//       console.log(res.data);
//     };
//     fetchData();
//   }, [id]);