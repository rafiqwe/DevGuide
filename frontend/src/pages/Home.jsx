import { useContext, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { SearchContext } from "../context/SearchContext";
import Popup from "../components/Popup";
import { usePopup } from "../context/PopupContext";

const Home = () => {
  const { setSearchResults } = useContext(SearchContext);

  useEffect(() => {
    setSearchResults([]);
    localStorage.removeItem("searchResults"); // ✅ Clear only on Home
  }, [setSearchResults]);

  const videos = [...Array(12)].map((_, i) => ({
    id: "abc123",
    thumbnail: "https://i.ytimg.com/vi/abc123/hqdefault.jpg",
    duration: "12:45",
    title: "How to Build a YouTube Clone in React JS",
    channelId: "channel123",
    channelName: "DevGuide Channel",
    channelAvatar:
      "https://www.shutterstock.com/image-vector/letter-dev-simple-logo-design-600nw-1784944118.jpg",
    views: "1.2M views",
    timeAgo: "2 days ago",
  }));

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 p-4">
        {videos.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </>
  );
};

export default Home;
