import React from 'react';
import ImageSlider from './ImageSlider';

const HeroSection = () => {
  return (
    <div className="">
      <div className="">
        <ImageSlider />
      </div>
      {/* <div className="w-full md:w-[30%] flex md:flex-col gap-4">
        <Image
          src={sideImage}
          alt="this is side image"
          className="w-full h-[100px] md:h-[240px] object-cover "
        />
        <Image
          src={sideImage}
          alt="this is side image"
          className="w-full h-[100px] md:h-[240px] object-cover "
        />
      </div> */}
    </div>
  );
};

export default HeroSection;
