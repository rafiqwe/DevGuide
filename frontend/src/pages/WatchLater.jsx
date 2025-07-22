import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProtectedPage from "./ProtectedPage";
import { SkeletonCard } from "../components/SkeletonCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const getWatchlater = async () => {
    try {
      const res = await API.get("/api/watchlater", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log("get WatchLater error", error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getWatchLater"],
    queryFn: getWatchlater,
  });

  const handleRemove = async (videoId) => {
    try {
      await API.delete(`/api/watchlater/${videoId}`);
      // Update query cache
      queryClient.setQueryData(["getWatchLater"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((video) => video.videoId !== videoId);
      });
    } catch (error) {
      console.log("Remove Data error:", error);
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

  if (!data || data.length === 0)
    return (
      <>
        <div className="flex flex-col items-center w-full justify-center h-full p-6 text-gray-500 dark:text-gray-400">
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
        <ProtectedPage />
      </>
    );

  return (
    <>
      <div className=" p-4 min-h-[calc(100vh-64px)] w-full bg-white dark:bg-[#121212] text-black dark:text-white">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight">
          🎬 Watch Later
        </h1>

        <div
          className="grid gap-8 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4"
        >
          {data.map(({ _id, videoId, title, thumbnail, duration }) => (
            <div
              key={_id}
              className="bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden cursor-pointer"
            >
              <Link to={`/watch/${videoId}`} className="block group">
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
                onClick={() => handleRemove(videoId)}
                aria-label="Remove from Watch Later"
                className="absolute top-3 cursor-pointer right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <ProtectedPage />
    </>
  );
};

export default WatchLater;
