import React from 'react';

const AudioProductCardSkeleton = () => {
  return (
    <div className="max-w-xs border h-[340px] shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-gray-200"></div>

      <div className="p-3 space-y-3">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        {/* Subtitle placeholder */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        {/* Price placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/3 my-2"></div>

        {/* In Stock placeholder */}
        <div className="h-3 bg-gray-300 rounded w-1/4 mb-2"></div>

        {/* Button placeholders */}
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AudioProductCardSkeleton;
