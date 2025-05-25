"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const WeekHighlights :React.FC<any> = ({ products }) => {
  const [hoverState, setHoverState] = useState({
    first: false,
  });

  return (
    <div className="grid lg:grid-cols-2 gap-6 px-4">
      {/* Main Product */}
      <Link
        href={"#"}
        className="flex flex-col justify-center items-center bg-gray-100 rounded-xl p-6 group relative"
      >
        {/* Label Badge with z-index */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          Sale
        </span>
        <div className="relative">
          <Image
            src={products?.main?.image}
            alt="Main Product"
            width={600}
            height={700}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <p className="text-lg font-bold mt-4 text-center dark:text-black">
          {products?.main?.name}
        </p>
        <button className="mt-4 text-sm font-medium opacity-80 group-hover:opacity-0 transition-opacity duration-300">
          {products?.main?.short_description}
        </button>
        <button className="absolute inset-x-0 bottom-4 mx-auto text-sm font-medium bg-black text-white w-24 h-8 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          Buy now
        </button>
      </Link>

      {/* Sub Products */}
      <div className="grid grid-cols-2 gap-6">
        {/* First Sub-product Column */}
        <div className="flex flex-col gap-6">
          {products?.sub_products_one?.map((row:any, index:any) => (
            <Link
              key={index}
              href={"#"}
              className="bg-gray-100 rounded-xl p-6 group relative"
            >
              {/* Label Badge with z-index */}
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                Sale
              </span>
              <div className="relative">
                <Image
                  src={row.image}
                  alt="Sub-product"
                  width={200}
                  height={250}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-base font-semibold mt-4 text-center dark:text-black">
                {row.name}
              </p>
              <button className="absolute inset-x-0 bottom-4 mx-auto text-sm font-medium bg-black text-white w-24 h-8 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                Buy now
              </button>
            </Link>
          ))}
        </div>

        {/* Second Sub-product Column */}
        <div className="flex flex-col gap-6">
          {products?.sub_products_twe?.map((row:any, index:any) => (
            <Link
              key={index}
              href={"#"}
              className="bg-gray-100 rounded-xl p-6 group relative"
            >
              {/* Label Badge with z-index */}
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                Sale
              </span>
              <div className="relative">
                <Image
                  src={row.image}
                  alt="Sub-product"
                  width={200}
                  height={250}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-base font-semibold mt-4 text-center dark:text-black">
                {row.name}
              </p>
              <button className="absolute inset-x-0 bottom-4 mx-auto text-sm font-medium bg-black text-white w-24 h-8 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                Buy now
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
