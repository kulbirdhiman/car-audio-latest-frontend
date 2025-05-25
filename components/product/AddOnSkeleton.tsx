import React from "react";


const SkeletonBox :React.FC<any> = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 ${className}`} />
);

const AddOnSkeleton = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1210, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 618, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="max-w-[200px] sm:max-w-[550px] border-y-2 p-2">
      <h1 className="font-bold text-xl">Add On</h1>
      <div className="relative w-full">
        <div className="slider-container px-5 md:w-full mx-auto">
          {/* <Slider {...settings}> */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex">
                <div className="w-[170px] mx-4 flex flex-col justify-evenly rounded-xl relative">
                  <SkeletonBox className="w-full h-[150px] mb-4" />
                  <SkeletonBox className="h-4 w-3/4 mx-auto mb-2" />
                  <SkeletonBox className="h-6 w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  );
};

export default AddOnSkeleton;
