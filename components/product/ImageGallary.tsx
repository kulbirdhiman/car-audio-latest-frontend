"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import toast from "react-hot-toast";
import { GiShoppingCart } from "react-icons/gi";
import { IN_STOCK } from "@/app/constants";
const ImageGallery = ({
  images,
  // handleCart,
  product,
  // increaseQuantity,
  // decreaseQuantity,
  // addToData
}: {
  images: any[];
  // handleCart: any;
  product: any;
  // increaseQuantity: any;
  // decreaseQuantity: any;
  // addToData: any;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  }, []);

  useEffect(() => {
    updateArrowVisibility();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrowVisibility);
    }
    return () => {
      container?.removeEventListener("scroll", updateArrowVisibility);
    };
  }, [updateArrowVisibility]);

  const scrollHorizontally = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  const downloadUserManual = () => {
    if (!product?.user_manual) {
      toast.error("User manual not available.");
      return;
    }
    const userManualUrl = `${process.env.NEXT_PUBLIC_S3_IMG_URL}${product.user_manual}`;
    const newTab = window.open(userManualUrl, "_blank");

    if (!newTab) {
      const link = document.createElement("a");
      link.href = userManualUrl;
      link.setAttribute("download", product.user_manual);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white lg:sticky top-10 p-4 rounded-md">
      {/* Main Image */}
      <Image
        height={2000}
        width={2000}
        priority
        src={
          images[selectedImage]?.image.includes("http")
            ? images[selectedImage]?.image
            : process.env.NEXT_PUBLIC_S3_IMG_URL + images[selectedImage]?.image
        }
        alt="Main Product"
        className="w-full h-[300px] md:h-[400px] object-contain rounded-lg"
      />

      {/* Thumbnail Row with Conditional Arrows */}
      <div className="relative w-full mt-4 flex items-center">
        {showLeftArrow && (
          <button
            onClick={() => scrollHorizontally("left")}
            className="absolute left-0 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto hide-scrollbar w-full px-8"
        >
          {images.map((image, index) => (
            <Image
              key={index}
              height={80}
              width={80}
              loading="lazy"
              src={
                image.image.includes("http")
                  ? image.image
                  : process.env.NEXT_PUBLIC_S3_IMG_URL + image.image
              }
              alt={`Thumbnail ${index + 1}`}
              className={`cursor-pointer min-w-[80px] h-20 border-2 rounded-md object-cover ${selectedImage === index
                  ? "border-blue-500"
                  : "border-gray-300"
                }`}
              onMouseEnter={() => setSelectedImage(index)}
            />
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scrollHorizontally("right")}
            className="absolute right-0 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      {product?.in_stock === IN_STOCK ? (
  <>
    {/* Buy Now & Quantity */}
    {/* <div className="flex flex-wrap items-center gap-6 mt-6">
      <div className="flex items-center border rounded-sm overflow-hidden bg-white">
        <button
          onClick={decreaseQuantity}
          className="w-12 h-12 text-2xl font-bold text-gray-600 hover:bg-gray-100 transition"
        >
          −
        </button>
        <div className="w-16 h-12 flex justify-center items-center text-2xl font-semibold text-gray-800">
          {addToData.quantity}
        </div>
        <button
          onClick={increaseQuantity}
          className="w-12 h-12 text-2xl font-bold text-gray-600 hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={() => handleCart(true)}
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 text-lg rounded-sm shadow-md hover:scale-105 hover:bg-green-700 transition-transform"
      >
        Buy Now
      </button>
    </div> */}

    {/* Add to Cart (separate row) */}
    {/* <div className="mt-4">
      <button
        onClick={() => handleCart(false)}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 text-lg rounded-xl hover:scale-105 hover:bg-blue-800 transition-transform"
      >
        <GiShoppingCart size={20} /> Add to Cart
      </button>
    </div> */}
  </>
) : (
  <span className="text-red-500 font-bold text-lg">Out of Stock</span>
)}


    </div>
  );
};

export default ImageGallery;
