import { HeartIcon } from "lucide-react";
import AddOnSkeleton from "./AddOnSkeleton";
// import TabComponent from "../skeleton/TabComponentSkelton";
export const ProductDetailSkeleton = () => {
  return (
    <div className=" animate-pulse">
      <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-6 ">
        {/* Image Skeleton */}
        <div className="w-full h-[400px] block lg:hidden bg-gray-300 rounded-lg"></div>
        <ImageGallerySkeleton />
        {/* Product Info Skeleton */}
        <div className="lg:col-span-3 lg:ps-6 lg:ms-2 mt-6 lg:mt-0 w-full space-y-4">
          <div className="h-12 w-full bg-gray-300 rounded"></div>
          <div className="h-12 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-8 w-2/12 mt-6 bg-gray-300 rounded"></div>
          <div className="h-8 w-4/12 bg-gray-300 rounded"></div>
          <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-12 w-full bg-gray-300 rounded"></div>

          <div className="mt-1 border-y-">
            <AddOnSkeleton />
          </div>
          <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
        </div>
       
      </div>
      <div className="mt-10">
         {/* <TabComponent /> */}
         </div>
         <div className="h-[300vh] w-full bg-gray-300 rounded"></div>

    </div>
  );
};

const ImageGallerySkeleton = () => {
  return (
    <div className="md:flex hidden lg:h-[450px] lg:col-span-2 lg:sticky top-10 bg-white animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="w-full relative block space-y-1"
          style={{ height: "400px" }}
        >
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="cursor-pointer w-16 h-20 transition-all duration-300 rounded-md border-2 "
            ></div>
          ))}
        </div>
        <button className="lg:flex hidden mt-6 w-16 py-2 px-4 bg-gray-300 items-center justify-center text-black border-2 rounded-full">
          <HeartIcon className="h-5 text-gray-500" />
        </button>
      </div>
      <div className=" flex flex-col  w-full  items-center mx-2">
        <div className="w-full h-[300px] lg:h-[500px] bg-gray-300 rounded-lg"></div>
        <div className="flex space-x-4 mt-6 w-full px-4">
          <button className="flex-1 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg"></button>
          <button className="flex-1 py-5 px-4 bg-gray-400 text-white rounded-lg"></button>
        </div>
      </div>
    </div>
  );
};
