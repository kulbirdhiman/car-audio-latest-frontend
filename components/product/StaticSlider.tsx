import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const StaticSlider = () => {
  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />, 
    prevArrow: <SamplePrevArrow />, 
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 618, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-bold mb-4">Image Slider</h1>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="p-3">
            <Image src={img} alt={`Slide ${index + 1}`} width={500} height={300} className="w-full h-auto object-cover rounded-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StaticSlider;
