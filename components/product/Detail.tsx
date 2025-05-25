"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import ImageGallery from "./ImageGallary";
import { Share2 } from "lucide-react";

const Detail = () => {
  const product:any = {
    id: 1,
    name: "Headunit with CarPlay for Universal 2DIN | 7″ inch pro",
    price: 49.99,
    discount_price: 45,
    description: "This is a sample product description.",
    images: [
      "/images/MK-2.jpg",
      "/images/Ba-BF.jpg",
      "/images/Ford-edge.jpg",
      "/images/MK-2.jpg",
      "/images/Ba-BF.jpg",
      "/images/Ford-edge.jpg",
    ],
    addOns: {
      battery: [
        { id: 1, name: "Extra Battery", price: 10 },
        { id: 2, name: "Battery Pack", price: 20 },
      ],
      accessories: [
        { id: 3, name: "Screen Protector", price: 5 },
        { id: 4, name: "Phone Case", price: 8 },
      ],
      warranty: [{ id: 5, name: "Warranty Extension", price: 15 }],
    },
  };

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [showUpButton, setShowUpButton] = useState<boolean>(false);
  const [showDownButton, setShowDownButton] = useState<boolean>(true);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [showCategory, setShowCategory] = useState<{ [key: string]: boolean }>({
    battery: false,
    accessories: false,
    warranty: false,
  });
  const [cart, setCart] = useState<
    {
      productId: number;
      quantity: number;
      addons: number[];
    }[]
  >([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const checkScrollButtonsVisibility = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      const clientHeight = scrollContainerRef.current.clientHeight;
      setShowUpButton(scrollTop > 0);
      setShowDownButton(scrollTop + clientHeight < scrollHeight);
    }
  };

  const scrollVertically = (direction: "up" | "down") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: direction === "down" ? 380 : -380,
        behavior: "smooth",
      });
    }
  };

  const images = useMemo(() => product.images, [product.images]);

  useEffect(() => {
    checkScrollButtonsVisibility();
    const handleScroll = () => checkScrollButtonsVisibility();
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    });
  };

  const handleAddonChange = (addonId: number) => {
    setSelectedAddons((prevSelectedAddons) =>
      prevSelectedAddons.includes(addonId)
        ? prevSelectedAddons.filter((id) => id !== addonId)
        : [...prevSelectedAddons, addonId]
    );
  };

  const toggleCategoryVisibility = (category: string) => {
    setShowCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const totalAddonPrice = selectedAddons.reduce((total, addonId) => {
    const allAddons = [
      ...product.addOns.battery,
      ...product.addOns.accessories,
      ...product.addOns.warranty,
    ];
    const addon = allAddons.find((addon) => addon.id === addonId);
    return addon ? total + addon.price : total;
  }, 0);

  const totalPrice = product.discount_price
    ? product.discount_price + totalAddonPrice
    : product.price + totalAddonPrice;

  const savedAmount = product.price - product.discount_price;

  const handleAddToCart = () => {
    const existingCartItem = cart.find(
      (item) =>
        item.productId === product.id &&
        JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
    );
    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id &&
          JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { productId: product.id, quantity: 1, addons: selectedAddons },
      ]);
    }
  };

  const handleUpdateQuantity = (action: "increment" | "decrement") => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === product.id &&
        JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
          ? {
              ...item,
              quantity:
                action === "increment" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-6 mx-auto w-full bg-white shadow-xl rounded-lg p-8">
        {/* <ImageGallery
          images={images}
 
        /> */}

        <div className="lg:col-span-3 ps-6 w-full">
         
        <h1 className="text-2xl sm:text-xl lg:w-4/6 font-extrabold text-gray-800">
            {product.name}
          </h1>
         
        
          {product.discount_price ? (
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center gap-3">
                <h2 className="text-5xl font-bold text-gray-700">
                  ${product.discount_price.toFixed(2)}
                </h2>
                <span className="text-lg text-red-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-lg font-semibold text-red-400">
                You save ${(product.price - product.discount_price).toFixed(2)}{" "}
                (
                {((1 - product.discount_price / product.price) * 100).toFixed(
                  0
                )}
                % OFF)
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </h2>
            </div>
          )}

          <p className="flex items-center gap-2 cursor-pointer my-3 text-purple-600 hover:text-purple-700">
            <HeartIcon className="h-5" /> Add to wishlist
          </p>

          <button
            // onClick={() => setIsSharePopupOpen(true)}
            className="flex items-center gap-2 py-2     bg-gry-400 my-3 transition"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>

          
    

          <div className="mt-6">
            <h3 className="font-semibold text-2xl text-gray-700">Add-Ons</h3>
            <div className="mt-4 space-y-4">
              {["battery", "accessories", "warranty"].map((category) => (
                <div key={category}>
                  <button
                    onClick={() => toggleCategoryVisibility(category)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    {showCategory[category] ? (
                      <ChevronUpIcon className="h-5" />
                    ) : (
                      <ChevronDownIcon className="h-5" />
                    )}
                  </button>
                  {showCategory[category] && (
                    <div className="mt-2 space-y-2">
                      {product.addOns[category].map((addon:any) => (
                        <div key={addon.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`addon-${addon.id}`}
                            checked={selectedAddons.includes(addon.id)}
                            onChange={() => handleAddonChange(addon.id)}
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor={`addon-${addon.id}`}
                            className="text-sm text-gray-600"
                          >
                            {addon.name} (+${addon.price})
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => handleUpdateQuantity("decrement")}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50"
              disabled={
                cart.find(
                  (item) =>
                    item.productId === product.id &&
                    JSON.stringify(item.addons) ===
                      JSON.stringify(selectedAddons)
                )?.quantity === 1
              }
            >
              -
            </button>
            <span className="text-xl font-semibold">
              {cart.find(
                (item) =>
                  item.productId === product.id &&
                  JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
              )?.quantity || 0}
            </span>
            <button
              onClick={() => handleUpdateQuantity("increment")}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              +
            </button>

            <button
              onClick={handleAddToCart}
              className="py-3 px-8 ml-4 bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-lg hover:bg-gradient-to-l transition ease-in-out duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
