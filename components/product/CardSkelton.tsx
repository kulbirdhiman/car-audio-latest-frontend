const CardSkeleton = () => {
    return (
      <div className=" border w-full mx-auto border-gray-300 rounded-lg shadow-lg p-4 bg-white  flex flex-col animate-pulse">
        {/* Image Placeholder */}
        <div className="relative w-[90%] mx-auto h-[13rem] bg-gray-200 rounded-md" />
  
        {/* Title Placeholder */}
        <div className="mt-4 h-6 bg-gray-200 rounded-md w-3/4 " />
        <div className="mt-2 h-6 bg-gray-200 rounded-md w-2/4 " />
  
        {/* Price Placeholder */}
        <div className="mt-auto h-6 bg-gray-200 rounded-md w-1/3 " />
  
        {/* Button Placeholder */}
        <div className="mt-4 w-full h-10 bg-gray-300 rounded-md" />
      </div>
    );
  };
  
  export default CardSkeleton;