"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getProductForShop } from "@/store/actions/admin/product";
import { XIcon } from "lucide-react";

interface Product {
  slug: string;
  name: string;
  discount_price: number;
  regular_price: number;
  images: { image: string }[];
}

interface BarProps {
  departments: any[];
}

const SearchBar: React.FC<BarProps> = ({ departments }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [apiHit, setApiHit] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const listProducts = async (input: string) => {
    try {
      setApiHit(false);
      let limit = 40;
      const data: any = {};
      const product_ids: any[] = [];

      if (input && input.length > 3 && totalRecords > limit) {
        limit = totalRecords;
      }

      data.search = input;
      const res = await dispatch(
        getProductForShop({
          ...data,
          limit: limit,
          product_ids: [...product_ids],
        })
      ).unwrap();

      if (res.success) {
        setApiHit(true);
        setProducts((res.data as any).result);

        if (res.data.totalRecords > totalRecords) {
          setTotalRecords(res.data.totalRecords);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      listProducts(search);
    }
  }, [search]);

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      {/* Search bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm text-black flex-grow placeholder:text-gray-500"
        />
        {search && (
          <button onClick={() => setSearch("")} className="ml-2">
            <XIcon className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {search && (
        <div className="absolute scrollbar-minimized max-h-[70vh] overflow-auto w-full top-full mt-2 bg-white shadow-lg border rounded-md z-50">
          {!apiHit ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <Link
                key={index}
                href={`/product/${product.slug}`}
                onClick={() => setSearch("")}
                className="flex gap-4 text-black p-3 hover:bg-blue-500 hover:text-white transition duration-200"
              >
                <Image
                  width={50}
                  height={50}
                  alt="Product Image"
                  src={
                    product.images[0]?.image.includes("http")
                      ? product.images[0].image
                      : process.env.NEXT_PUBLIC_S3_IMG_URL +
                        product.images[0].image
                  }
                  className="h-12 w-auto rounded"
                />
                <div className="flex justify-between w-full items-center gap-2">
                  <p className="font-medium max-w-[350px] line-clamp-2 text-sm">
                    {product.name}
                  </p>
                  <h1 className="font-medium">
                    $
                    {product.discount_price > 0
                      ? product.discount_price
                      : product.regular_price}
                  </h1>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
