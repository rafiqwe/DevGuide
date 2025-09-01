// const Roadmap = () => {
//   return (
//     <motion.div
//       className="w-full h-[calc(100vh-64px)] p-4 dark:bg-[#0f0f0f] bg-white "
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center justify-center flex-col gap-2">
//         <h1 className="text-xl font-semibold mb-3 text-center text-black dark:text-white">
//           FullStack Developer Roadmap 🚀
//         </h1>
//         <Link
//           className="px-10 py-3 rounded-xl border border-slate-400 hover:bg-slate-800 hover:text-gray-100 transition-colors translate-2 font-bold"
//           to={"/playlists"}
//         >
//           Learn FullStack
//         </Link>
//       </div>
//       <div className="w-full h-[500px] mt-6 rounded-lg border-2 border-slate-400 dark:border-gray-700">
//         <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
//           <Background color="#aaa" gap={16} />
//           <Controls />
//         </ReactFlow>
//       </div>
//     </motion.div>
//   );
// };

// export default Roadmap;

// src/pages/Roadmap.jsx
import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const nodeBaseStyle = {
  padding: "10px 15px",
  borderRadius: 12,
  fontWeight: 500,
  border: "1px solid #ddd",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  background: "white",
};

const allNodes = [
  {
    id: "start",
    type: "input",
    data: { label: "🚀 Start Developer Journey" },
    position: { x: 500, y: 0 },
    style: { ...nodeBaseStyle, background: "#e0f7fa", fontWeight: "bold" },
  },

  // Frontend Branch
  {
    id: "frontend",
    data: { label: "🌐 Frontend" },
    position: { x: 200, y: 100 },
    style: { ...nodeBaseStyle, background: "#e1f5fe" },
    category: "frontend",
    tooltip: "Frontend technologies to build UI",
  },
  {
    id: "html",
    data: { label: "HTML" },
    position: { x: 100, y: 180 },
    style: nodeBaseStyle,
    category: "frontend",
    tooltip: "Markup language for webpages",
  },
  {
    id: "css",
    data: { label: "CSS" },
    position: { x: 200, y: 180 },
    style: nodeBaseStyle,
    category: "frontend",
    tooltip: "Styling the content",
  },
  {
    id: "js",
    data: { label: "JavaScript" },
    position: { x: 300, y: 180 },
    style: nodeBaseStyle,
    category: "frontend",
    tooltip: "Logic and interactivity",
  },
  {
    id: "responsive",
    data: { label: "Responsive Design" },
    position: { x: 150, y: 260 },
    style: nodeBaseStyle,
    category: "frontend",
    tooltip: "Design for all devices",
  },
  {
    id: "git",
    data: { label: "Git & GitHub" },
    position: { x: 280, y: 260 },
    style: nodeBaseStyle,
    category: "tools",
    tooltip: "Version control",
  },
  {
    id: "react",
    data: { label: "React.js" },
    position: { x: 200, y: 340 },
    style: nodeBaseStyle,
    category: "frontend",
    tooltip: "Popular frontend library",
  },

  // Backend Branch
  {
    id: "backend",
    data: { label: "🛠️ Backend" },
    position: { x: 800, y: 100 },
    style: { ...nodeBaseStyle, background: "#ede7f6" },
    category: "backend",
    tooltip: "Server-side technologies",
  },
  {
    id: "node",
    data: { label: "Node.js" },
    position: { x: 700, y: 180 },
    style: nodeBaseStyle,
    category: "backend",
    tooltip: "JS runtime on server",
  },
  {
    id: "express",
    data: { label: "Express.js" },
    position: { x: 800, y: 180 },
    style: nodeBaseStyle,
    category: "backend",
    tooltip: "Web framework for Node.js",
  },
  {
    id: "mongodb",
    data: { label: "MongoDB" },
    position: { x: 900, y: 180 },
    style: nodeBaseStyle,
    category: "backend",
    tooltip: "NoSQL Database",
  },
  {
    id: "api",
    data: { label: "REST API / CRUD" },
    position: { x: 800, y: 260 },
    style: nodeBaseStyle,
    category: "backend",
    tooltip: "Communicate with clients",
  },

  // Deployment
  {
    id: "deployment",
    data: { label: "🚢 Deployment (Vercel / Netlify)" },
    position: { x: 500, y: 420 },
    style: { ...nodeBaseStyle, background: "#f3e5f5" },
    category: "tools",
    tooltip: "Host your fullstack app",
  },
];

const allEdges = [
  { id: "start-frontend", source: "start", target: "frontend", animated: true },
  { id: "start-backend", source: "start", target: "backend", animated: true },

  { id: "frontend-html", source: "frontend", target: "html" },
  { id: "frontend-css", source: "frontend", target: "css" },
  { id: "frontend-js", source: "frontend", target: "js" },
  { id: "html-responsive", source: "html", target: "responsive" },
  { id: "css-responsive", source: "css", target: "responsive" },
  { id: "js-git", source: "js", target: "git" },
  { id: "responsive-react", source: "responsive", target: "react" },
  { id: "git-react", source: "git", target: "react" },

  { id: "backend-node", source: "backend", target: "node" },
  { id: "backend-express", source: "backend", target: "express" },
  { id: "backend-mongodb", source: "backend", target: "mongodb" },
  { id: "express-api", source: "express", target: "api" },
  { id: "mongodb-api", source: "mongodb", target: "api" },

  { id: "react-deployment", source: "react", target: "deployment" },
  { id: "api-deployment", source: "api", target: "deployment" },
];

const Roadmap = () => {
  const [nodes, _, onNodesChange] = useNodesState(allNodes);
  const [edges, __, onEdgesChange] = useEdgesState(allEdges);
  const [filter, setFilter] = useState("all");

  const filteredNodes =
    filter === "all"
      ? nodes
      : nodes.filter((n) => n.category === filter || n.id === "start");
  const filteredEdges = edges.filter(
    (e) =>
      filteredNodes.find((n) => n.id === e.source) &&
      filteredNodes.find((n) => n.id === e.target)
  );

  return (
    <>
      <Helmet>
        <title>Road Map - DevGuide</title>
        <meta
          name="description"
          content="Road map page of  Devguide, showcasing the learning path for aspiring developers."
        />
        <meta
          name="keywords"
          content=" coding video platform, coding playlists, programming video content,Fullstack home page, coding video streaming, online coding videos, video library"
        />
      </Helmet>
      <motion.div
        className="w-full  p-2 md:p-2 dark:bg-[#0f0f0f] bg-white "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center flex-col mb-6 gap-2">
          <h1 className="text-3xl font-bold  mb-3 mt-8 text-center text-black dark:text-white">
            FullStack Developer Roadmap 🚀
          </h1>
          <Link
            className="px-10 py-3 rounded-xl border border-slate-400 hover:bg-slate-800 hover:text-gray-100 transition-colors translate-2 font-bold"
            to={"/playlists"}
          >
            Learn FullStack
          </Link>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {["all", "frontend", "backend", "tools"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-10 py-3 border-slate-400 cursor-pointer rounded-xl font-bold text-sm border ${
                filter === f
                  ? "bg-blue-600 text-white border-slate-400"
                  : "bg-white dark:bg-gray-800 text-black  hover:bg-slate-800 dark:text-white"
              } transition`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="w-full h-full border-2 border-slate-400 dark:border-gray-700 rounded-lg">
          <ReactFlow
            nodes={filteredNodes}
            edges={filteredEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <Background color="#aaa" gap={16} />
            <Controls />
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                padding: "6px 10px",
                background: "rgba(255,255,255,0.85)",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                zIndex: 10,
              }}
            >
              🌐 Frontend | 🛠️ Backend | 🚢 Deployment
            </div>
          </ReactFlow>
        </div>
      </motion.div>
    </>
  );
};

export default Roadmap;
