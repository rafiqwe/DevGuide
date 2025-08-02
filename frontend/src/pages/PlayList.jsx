import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../services/api";
import { SkeletonCard } from "../components/SkeletonCard";
import { useQuery } from "@tanstack/react-query";

const tags = [
  "all",
  "react",
  "node",
  "animation",
  "python",
  "mongodb",
  "frontend",
  "backend",
];

const Playlist = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  // const [playlists, setPlaylists] = useState([]);

  const getPlaylists = async () => {
    try {
      const res = await API.get("/api/playlist");
      // setPlaylists(res.data);
      return res.data;
    } catch (error) {
      console.log("Playlist fatching error: ", error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });



  const filteredPlaylists =
    selectedTag === "all"
      ? data
      : data.filter((p) => p.tags.includes(selectedTag.toLowerCase()));

  return (
    <>
      {isLoading ? (
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
      ) : (
        <motion.div
          className="p-4 dark:bg-[#0f0f0f] w-full bg-white min-h-[calc(100vh-64px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-semibold text-center mb-6 text-black dark:text-white">
            📂 Developer Playlists
          </h1>

          {/* Tag Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-4 py-2 rounded-xl cursor-pointer     text-sm font-semibold capitalize backdrop-blur-md transition-all duration-300
      ${
        selectedTag === tag
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
          : "bg-white/10 dark:bg-gray-800/30 text-black dark:text-white border border-gray-300 dark:border-gray-600"
      }
      overflow-hidden`}
              >
                <span
                  className={`relative z-10 ${
                    selectedTag === tag
                      ? ""
                      : "hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {tag}
                </span>

                {/* Glowing border animation for selected */}
                {selectedTag === tag && (
                  <motion.span
                    layoutId="tag-glow"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-lg"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Filtered Playlists */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaylists.map((playlist) => (
              <Link
                key={playlist.playlistId}
                to={`/playlist/${playlist.playlistId}`}
                className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-medium text-black dark:text-white">
                    {playlist.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {playlist.description}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mt-2">
                    🎥 {playlist.channelTitle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Playlist;
