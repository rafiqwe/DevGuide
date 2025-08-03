import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiOutlineSearch, HiUserCircle, HiX } from "react-icons/hi";
import { UserDataContext } from "../context/UserContext";
import API from "../services/api";
import { SearchContext } from "../context/SearchContext";
import ThemeToggle from "../components/ThemeToggle";

const Header = ({ toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { setSearchResults } = useContext(SearchContext);
  const [imageSrc, setImageSrc] = useState(null);

  // ✅ Define allowed coding-related keywords
  const codingKeywords = [
    // Languages
    "javascript",
    "js",
    "typescript",
    "ts",
    "python",
    "java",
    "c",
    "c++",
    "c#",
    "ruby",
    "go",
    "kotlin",
    "dart",
    "php",
    "sql",
    "bash",
    "shell",
    "json",
    "yaml",

    // Web-related
    "html",
    "css",
    "sass",
    "scss",
    "less",
    "tailwind",
    "bootstrap",
    "bulma",
    "material ui",
    "vite",
    "webpack",
    "babel",
    "pug",

    // Frameworks & Libraries
    "react",
    "reactjs",
    "react.js",
    "nextjs",
    "next.js",
    "vue",
    "vuejs",
    "angular",
    "svelte",
    "remix",
    "astro",
    "nuxt",
    "express",
    "nestjs",

    // Backend & DevOps
    "node",
    "nodejs",
    "mongodb",
    "mongoose",
    "firebase",
    "mysql",
    "postgres",
    "graphql",
    "rest api",
    "api",
    "docker",
    "kubernetes",
    "ci/cd",
    "jenkins",
    "vercel",
    "netlify",
    "nginx",

    // State, Auth, Tools
    "redux",
    "zustand",
    "context api",
    "jwt",
    "auth",
    "passport",
    "oauth",
    "axios",
    "fetch",
    "tanstack",
    "react query",

    // Testing
    "jest",
    "cypress",
    "testing library",
    "mocha",
    "chai",
    "unit test",
    "e2e test",

    // Career/Concepts
    "web development",
    "web dev",
    "fullstack",
    "frontend",
    "backend",
    "software engineer",
    "developer",
    "coding",
    "programming",
    "interview prep",
    "leetcode",
    "algorithms",
    "data structures",
    "dsa",
    "oop",
    "async",
    "design patterns",
    "clean code",
    "code quality",
    "performance",

    // Cloud & Tools
    "github",
    "gitlab",
    "git",
    "github actions",
    "aws",
    "azure",
    "gcp",
    "cloud functions",
    "lambda",

    // Mobile/Other
    "flutter",
    "react native",
    "android",
    "ios",
    "pwa",
    "hybrid app",
    "mobile dev",
  ];

  useEffect(() => {
    async function response() {
      const res = await API.get(`/user/profile-image`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(res.data);
      setImageSrc(blobUrl);
    }

    response();
  }, []);

  const isCodingTopic = (query) => {
    const lowerQuery = query.toLowerCase();
    return codingKeywords.some((keyword) => lowerQuery.includes(keyword));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    // ❌ Restrict non-coding topics
    if (!isCodingTopic(trimmed)) {
      return alert("❌ Only coding-related searches are allowed!");
    }

    try {
      const res = await API.get(`/api/videos`, {
        params: { topic: trimmed },
      });

      setSearchResults(res.data);
      localStorage.setItem("searchResults", JSON.stringify(res.data)); // ✅ Save to localStorage
      navigate(`/results?search_query=${encodeURIComponent(trimmed)}`);
      setShowMobileSearch(false);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 bg-white dark:bg-[#0f0f0f] shadow-md sticky top-0 z-50 w-full">
      {/* Top row: Menu + Logo + Mobile Search Toggle */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 sm:inline-block"
            onClick={toggleSidebar}
          >
            <HiMenu size={24} className="text-black dark:text-white" />
          </button>
          <Link to="/" className="flex items-center space-x-1 w-full relative">
            {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
            <p className=" text-xl font-bold text-black dark:text-white">
              <span className="text-indigo-500 font-extrabold">Dev</span>Guide
            </p>
            <span className=" absolute top-0 -right-9 px-[7px] py-[2px] rounded-2xl font-bold text-[10px] bg-slate-500 text-white block">
              Beta
            </span>
          </Link>
        </div>

        {/* Show/hide search on mobile */}
        <button
          onClick={() => setShowMobileSearch((prev) => !prev)}
          className="sm:hidden p-2 "
        >
          {showMobileSearch ? (
            <HiX size={24} className="text-black  dark:text-white" />
          ) : (
            <HiOutlineSearch size={24} className="text-black dark:text-white" />
          )}
        </button>
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className={`mt-2 sm:mt-0 sm:ml-4 sm:flex sm:flex-1 max-w-xl mx-auto ${
          showMobileSearch ? "flex w-full mt-4" : "hidden sm:flex"
        }`}
      >
        <input
          type="text"
          value={search}
          name="topic"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coding videos"
          className="flex-grow ml-10 px-4 rounded-l-full py-2 text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none transition-all duration-300"
        />
        <button
          type="submit"
          className="px-4 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-full"
        >
          <HiOutlineSearch
            size={20}
            className="text-black cursor-pointer dark:text-white"
          />
        </button>
      </form>

      {/* Right: User Info */}
      <div className="hidden sm:flex items-center space-x-4 text-black dark:text-white capitalize ml-auto">
        {user ? (
          <Link to="/profile" className="hover:underline">
            {imageSrc && (
              <img
                src={imageSrc}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-1 hover:underline hover:text-cyan-400"
          >
            <HiUserCircle size={26} />
            <span>Login</span>
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
