import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center py-16">
      <div className="w-full max-w-4xl bg-white dark:bg-[#27282F] rounded-3xl shadow-xl p-10 animate-pulse">
        <div className="mb-5 space-y-2">
          <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        {/* Cover image skeleton */}
        <div className="w-full h-28 bg-gray-300 dark:bg-gray-700 rounded mb-10"></div>

        <div className="flex flex-col sm:flex-row gap-6 mt-10 sm:items-center justify-between">
          <div className="flex items-center gap-6 w-full">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="w-48 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="space-y-4 w-full sm:w-60">
            <div className="w-full h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-full h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Email section skeleton */}
        <div className="mt-10 space-y-3">
          <div className="w-40 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-60 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
