export const SkeletonCard = () => {
  return (
    <div className="rounded-2xl w-full   bg-white dark:bg-[#1c1c1c] shadow-md overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="h-48 bg-gray-200 dark:bg-[#2b2b2b] w-full relative">
        <div className="absolute bottom-3 right-3 bg-gray-300 dark:bg-[#444] h-4 w-12 rounded" />
      </div>

      {/* Title and Info */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 dark:bg-[#3a3a3a] rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-3/4" />
      </div>
    </div>
  );
};
