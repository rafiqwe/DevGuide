import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const demoVideos = [
  {
    id: "1",
    title: "Learn React in 1 Hour",
    thumbnail: "https://i.ytimg.com/vi/Dorf8i6lCuk/hqdefault.jpg",
    duration: "1:00:00",
  },
  {
    id: "2",
    title: "Node.js Crash Course",
    thumbnail: "https://i.ytimg.com/vi/TlB_eWDSMt4/hqdefault.jpg",
    duration: "45:30",
  },
  {
    id: "3",
    title: "MongoDB Tutorial",
    thumbnail: "https://i.ytimg.com/vi/oSIv-E60NiU/hqdefault.jpg",
    duration: "30:12",
  },
  {
    id: "4",
    title: "CSS Grid Layout Crash Course",
    thumbnail:
      "https://i.ytimg.com/vi/jV8B24rSN5o/hqdefault.jpg",
    duration: "50:10",
  },
  {
    id: "5",
    title: "JavaScript ES6 Features",
    thumbnail:
      "https://i.ytimg.com/vi/NCwa_xi0Uuc/hqdefault.jpg",
    duration: "40:25",
  },
];

const WatchLater = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchLaterVideos");
    if (saved) {
      setVideos(JSON.parse(saved));
    } else {
      setVideos(demoVideos);
    }
  }, []);

  const handleRemove = (id) => {
    const updated = videos.filter((video) => video.id !== id);
    setVideos(updated);
    localStorage.setItem("watchLaterVideos", JSON.stringify(updated));
  };

  if (videos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-gray-500 dark:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32 mb-6 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6v12a2 2 0 002 2h1m5-16v4m-2 8h6"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">No videos saved yet</h2>
        <p className="max-w-xs text-center">
          Save videos to watch later and they'll appear here.
        </p>
      </div>
    );

  return (
    <div className="p-6 min-h-[calc(100vh-64px)] bg-white dark:bg-[#121212] text-black dark:text-white">
        
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight">🎬 Watch Later</h1>

      <div className="grid gap-8 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4">
        {videos.map(({ id, title, thumbnail, duration }) => (
          <div
            key={id}
            className="bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden cursor-pointer"
          >
            <Link to={`/video/${id}`} className="block group">
              <div className="relative ">
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-48 object-cover  rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-xs text-white rounded px-2 py-0.5 font-mono">
                  {duration}
                </span>
              </div>
              <h3 className="p-4 font-semibold text-lg truncate">{title}</h3>
            </Link>
            <button
              onClick={() => handleRemove(id)}
              aria-label="Remove from Watch Later"
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchLater;
