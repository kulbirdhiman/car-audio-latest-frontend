"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import headunit from "@/public/v6Banner.png"
import amp from "@/public/images/Amp-banner.png"
import speaker from "@/public/images/Speaker-Banner.png"

const slides = [
  {
    image: headunit,
    title: "Kayhan Version 6 Head Unit",
    description: "Power, Performance & Perfection!",
    slug: "product/list?category=satnav-stereo",
  },
  {
    image: amp,
    title: "Boost Your Sound with Our Amplifiers!",
    description: "Experience powerful, clear, and immersive audio!",
    slug: "product/list?company=amplifier",
  },
  {
    image: speaker,
    title: "Crystal-Clear Sound, Every Beat!",
    description: "Upgrade your audio with our premium speakers.",
    slug: "product/list?company=subwoofer",
  },
];

const ImageSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="w-full  mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative  w-10/12 mx-auto rounded-lg h-[250px] sm:h-[300px] ">
              <Image
                priority={index === 0}
                quality={100}
                width={1920}
                height={1080}
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 rounded-lg w-full h-full object-fill"
              />
              {index === activeSlide && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-start justify-center p-4 sm:p-8 text-left font-serif text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-xs  md:text-2xl font-extrabold mb-2">
                    {slide.title}
                  </h1>
                  <p className="text-[10px]  md:text-lg max-w-lg opacity-90">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.slug}
                    className="text-xs sm:text-lg border p-1 rounded border-white text-white mt-3 hover:bg-white hover:text-black transition"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
