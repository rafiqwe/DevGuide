const VideoSkeleton = () => {
  return (
    <div className="px-4 sm:px-6 mt-7 mb-90 md:px-8 max-w-6xl h-screen mx-auto animate-pulse">
      {/* Skeleton Video */}
      <div className="aspect-video w-full rounded-xl bg-gray-300 dark:bg-[#2a2a2a] mb-6" />

      {/* Title + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-[#3a3a3a] rounded" />
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-[#3a3a3a]" />
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-[#3a3a3a]" />
        </div>
      </div>

      {/* Channel + Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-[#3a3a3a]" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 dark:bg-[#3a3a3a] rounded" />
            <div className="h-3 w-24 bg-gray-300 dark:bg-[#3a3a3a] rounded" />
          </div>
        </div>
        <div className="h-4 w-32 bg-gray-300 dark:bg-[#3a3a3a] rounded" />
      </div>

      {/* Description */}
      <div className="bg-gray-100 dark:bg-[#2f2f2f] p-4 rounded-lg space-y-3 mb-10">
        <div className="h-4 w-full bg-gray-300 dark:bg-[#444] rounded" />
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-[#444] rounded" />
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-[#444] rounded" />
        <div className="h-4 w-24 bg-gray-300 dark:bg-[#444] rounded" />
      </div>
    </div>
  );
};

export default VideoSkeleton;
