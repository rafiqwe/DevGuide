// src/layout/MainLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white ">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="px-4 flex-1 flex gap-3  h-auto overflow-auto  bg-white dark:bg-[#0f0f0f] text-black dark:text-white scrollbar-hide ">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
