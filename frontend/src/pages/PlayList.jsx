// src/pages/Playlist.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const playlists = [
  {
    id: "react",
    title: "React Crash Course",
    tags: ["react", "frontend"],
    description: "Learn the fundamentals of React.js from scratch.",
    thumbnail: "https://i.ytimg.com/vi/Dorf8i6lCuk/hqdefault.jpg",
    videoCount: 10,
  },
  {
    id: "node",
    title: "Node.js for Beginners",
    tags: ["node", "backend"],
    description: "Understand backend development with Node.js.",
    thumbnail: "https://i.ytimg.com/vi/TlB_eWDSMt4/hqdefault.jpg",
    videoCount: 8,
  },
  {
    id: "mongodb",
    title: "MongoDB Mastery",
    tags: ["mongodb", "backend"],
    description: "Database concepts and MongoDB for fullstack devs.",
    thumbnail: "https://i.ytimg.com/vi/oSIv-E60NiU/hqdefault.jpg",
    videoCount: 7,
  },
];

const tags = ["all", "react", "node", "mongodb", "frontend", "backend"];

const Playlist = () => {
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredPlaylists =
    selectedTag === "all"
      ? playlists
      : playlists.filter((p) => p.tags.includes(selectedTag.toLowerCase()));

  return (
    <motion.div
      className="p-4 dark:bg-[#0f0f0f] bg-white min-h-[calc(100vh-64px)]"
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
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
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
                🎥 {playlist.videoCount} Videos
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Playlist;
