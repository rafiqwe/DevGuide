import { useContext, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { SearchContext } from "../context/SearchContext";
import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import { SkeletonCard } from "../components/SkeletonCard";
import { Helmet } from "react-helmet-async";

const getHomeData = async () => {
  const res = await API.get("/api/home");
  return res.data;
};

const Home = () => {
  const { setSearchResults } = useContext(SearchContext);

  const { data, isLoading } = useQuery({
    queryKey: ["Home"],
    queryFn: getHomeData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    setSearchResults([]);
    localStorage.removeItem("searchResults");
  }, [setSearchResults]);

  if (isLoading) {
    return (
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center w-full mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home - Video Platform Devguide</title>
      </Helmet>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 p-4">
        {data?.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </>
  );
};

export default Home;
