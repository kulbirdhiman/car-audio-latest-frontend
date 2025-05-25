const NewArrivalCardSkeleton = () => {
    return (
      <div className="border shadow-sm p-4 animate-pulse min-w-[300px] sm:min-w-0">
        <div className="w-full h-40 bg-gray-200 mb-4 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    );
  };
  export default NewArrivalCardSkeleton;
  