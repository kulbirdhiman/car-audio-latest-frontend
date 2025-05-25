"use client";

import React, { useState, useCallback, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageGalleryMobile = ({ images }: { images: { image: string }[] }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleAfterChange = useCallback((index: number) => {
    setSelectedImage(index);
  }, [images]);

  useEffect(() => {
    console.log("Received images:", images);
  }, [images]);
  

  const settings = {
    dots: images.length > 1, // Hide dots if only one image
    infinite: images.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: images.length > 1,
    afterChange: handleAfterChange,
    appendDots: (dots: React.ReactNode) => (
      <div className="w-full flex justify-center items-center mt-4">
        <ul className="flex justify-center space-x-2 list-none m-0 p-0">{dots}</ul>
      </div>
    ),
    customPaging: (index: number) => (
      <div
        className={`w-3 h-3 rounded-full transition-all ${
          selectedImage === index ? "bg-blue-600 scale-125" : "bg-gray-400 hover:bg-gray-600"
        }`}
      />
    ),
  };

  return (
    <div className="max-w-[500px] w-full bg-white mx-auto md:hidden block rounded-md p-4  relative">
      <Slider {...settings} className="rounded-lg overflow-hiden">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={image.image.includes('http')? image.image  : process.env.NEXT_PUBLIC_S3_IMG_URL +image.image  }
              alt={`Product Image ${index + 1}`}
              width={500}
              height={500}
              className="object-cover rounded-lg"
              loading={index === 0 ? "eager" : "lazy"} // Preloads first image, lazy loads others
              aria-hidden={selectedImage !== index} // Improves accessibility
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageGalleryMobile;
