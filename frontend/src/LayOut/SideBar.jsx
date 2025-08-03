import { NavLink } from "react-router-dom";
import { HiHome, HiClock, HiHeart, HiViewList, HiUser } from "react-icons/hi";
import { RiRoadMapFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { SiGooglegemini } from "react-icons/si";

const navItems = [
  { label: "Home", icon: <HiHome />, to: "/" },
  { label: "Road Map", icon: <RiRoadMapFill />, to: "/roadmap" },
  { label: "Bookmarks", icon: <FaBookmark />, to: "/book-marks" },
  { label: "Watch Later", icon: <HiClock />, to: "/watch-later" },
  { label: "Gemini AI", icon: <SiGooglegemini />, to: "/ai" },
  { label: "Playlists", icon: <HiViewList />, to: "/playlists" },
  { label: "Profile", icon: <HiUser />, to: "/profile" },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`h-screen sticky top-0 left-0 bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-gray-800 px-2 py-6 overflow-y-auto transition-all duration-300  ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <nav className="space-y-2">
        {navItems.map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <span className="dark:text-white text-black text-[16px]">
              {icon}
            </span>
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
