"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "@/components/globals/DeleteModel";

interface WishlistItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  slug: string;
}

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      slug: "android-car-stereo",
      image: "/products/stereo1.jpg",
      title: "Android Car Stereo",
      subtitle: "10.1\" Touchscreen, GPS, Bluetooth",
      price: 249.99,
    },
    {
      id: 2,
      slug: "linux-car-headunit",
      image: "/products/headunit1.jpg",
      title: "Linux Car Headunit",
      subtitle: "7\" Display, Rear Camera Support",
      price: 199.99,
    },
    {
      id: 3,
      slug: "wireless-carplay-module",
      image: "/products/carplay1.jpg",
      title: "Wireless CarPlay Module",
      subtitle: "Plug & Play, iOS & Android support",
      price: 129.99,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

  const handleDelete = () => {
    if (selectedItem) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== selectedItem.id));
      setOpen(false);
    }
  };

  const total = wishlistItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="w-11/12 mx-auto my-7 font-serif">
      <h1 className="text-3xl mb-5">Wishlist</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Wishlist Items */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-md p-3 bg-white shadow relative text-sm"
            >
              <Link href={`/product/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="rounded w-full object-cover max-h-[160px]"
                />
              </Link>

              <div className="mt-2">
                <h2 className="text-base font-bold">{item.title}</h2>
                <p className="text-xs text-gray-500">{item.subtitle}</p>

                <div className="flex justify-between mt-3 items-center font-semibold">
                  <span className="text-blue-950">₹{item.price.toFixed(2)}</span>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setOpen(true);
                    }}
                  >
                    <RiDeleteBin6Line className="text-lg text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Summary - Desktop */}
        {/* {wishlistItems.length > 0 && (
          <div className="lg:w-[300px] w-full lg:sticky lg:top-20 bg-[#F9F9F9] text-black p-5 h-fit rounded-md shadow-md hidden sm:block">
            <h2 className="font-extrabold text-xl mb-4">Wishlist Summary</h2>
            <div className="flex justify-between text-base font-semibold mb-5">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link
              href="/"
              className="bg-blue-800 transition-colors text-white py-2 px-4 rounded block text-center text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        )} */}

        {/* Mobile Bottom Summary */}
        {/* {wishlistItems.length > 0 && (
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-md">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Total: ₹{total.toFixed(2)}</span>
              <Link
                href="/"
                className="bg-blue-800 text-white px-4 py-2 rounded text-sm"
              >
                Continue
              </Link>
            </div>
          </div>
        )} */}
      </div>

      {/* Delete Modal */}
      <DeleteModal setOpen={setOpen} open={open} deleteRecord={handleDelete} />
    </div>
  );
};

export default WishlistPage;
