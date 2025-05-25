"use client";
import React, { useEffect, useState, useMemo, useRef, Suspense } from "react";
// import dynamic from "next/dynamic";
import { getHotdeals } from "@/store/actions/home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
// import Link from "next/link";
import Image from "next/image";
// import AudioProductCard from './AudioCard';
import NewArrivalCardSkeleton from "../Skeleton/NewArrivalCardSkeleton";
import Link from "next/link";
const products = [
  {
    image: "/car-banner.png",
    title: "Car Stereo with SatNav For Mercedes Vito",
    subtitle: "",
    price: 877,
  },
  {
    image: "/car-banner.png",
    title: "Car Stereo with SatNav For Mercedes Vito",
    subtitle: "",
    price: 877,
  },
  {
    image: "/car-banner.png",
    title: "Car Stereo with SatNav For Mercedes Vito",
    subtitle: "",
    price: 877,
  },
  {
    image: "/car-banner.png",
    title: "Car Stereo with SatNav For Mercedes Vito",
    subtitle: "",
    price: 877,
  },
];

const ProductCard = ({
  images,
  name,
  title,
  regular_price,
  slug,
  discount_price,
}: {
  images: { image: string }[];
  name: string;
  title: string;
  slug: string;
  regular_price: number;
  discount_price: number;
}) => {
  const imgSrc = images?.[0]?.image?.includes("http")
    ? images[0].image
    : `${process.env.NEXT_PUBLIC_S3_IMG_URL}${images?.[0]?.image}`;
  return (
    <Link
      href={`product/${slug}`}
      className="flex h-[350px] md:h-[200px] flex-col sm:flex-row border border-gray-400 rounded overflow-hidden shadow-sm bg-white w-full max-w-sm sm:max-w-none"
    >
      {/* Image */}
      <div className="w-full sm:w-1/2 h-48 sm:h-auto">
        <Image
          height={300}
          width={300}
          src={imgSrc}
          alt={name}
          className="h-full w-full object-fill"
        />
      </div>

      {/* Content */}
      <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold line-clamp-1  text-gray-800">
            {name}
          </h2>
          {title && (
            <p className="text-sm line-clamp-1 text-gray-500 mt-1">{title}</p>
          )}
          {discount_price ? (
            <div className="mt-3 text-lg flex gap-2">
              <p className="text-gray-500 line-through">${regular_price}</p>
              <p className="text-xl font-bold text-red-600">
                ${discount_price}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xl font-bold text-black">
              Price: ${regular_price}
            </p>
          )}
        </div>
        {/* <div
          className="text-sm overflow-clip h-[60px] text-gray-600 "
          dangerouslySetInnerHTML={{ __html: specification}}
        /> */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button className="border border-purple-500 text-purple-500 px-4 py-1.5 rounded-full text-sm hover:bg-purple-50">
            Buy now
          </button>
          <button className="bg-purple-700 text-white px-4 py-1.5 rounded-full text-sm hover:bg-purple-800">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

const NewArrivals = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const list = async () => {
    try {
      const res = await dispatch(getHotdeals({})).unwrap();
      if (res.success) {
        setData(res.data.result);
        console.log(res.data.result, "data ttttt ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    list();
  }, []);
  return (
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-2xl font-serif font-bold mb-6">NEW ARRIVALS</h2>

      <div className="flex flex-wrap gap-6">
        {/* Responsive Product Grid */}
        <div className="flex-[1_1_70%] overflow-x-auto sm:overflow-visible">
          <div
            className="
            flex sm:grid 
            sm:grid-cols-2 
            gap-6 
            min-w-max sm:min-w-0
          "
          >
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="min-w-[250px]  sm:min-w-0"
                  >
                    <NewArrivalCardSkeleton />
                  </div>
                ))
              : data.map((product: any) => (
                  <div
                    key={product.id}
                    className="min-w-[50px] overflow-x-auto sm:min-w-0"
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
