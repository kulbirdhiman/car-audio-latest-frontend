"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  calculatePrice,
  calculateSubTotal,
  deleteCart,
  localCartData,
  myCart,
} from "@/store/actions/cart";
import DeleteModal from "@/components/globals/DeleteModel";
import { AppDispatch } from "@/store/store";
import { USER_ROLE } from "../constants";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  slug: string;
  images: any;
  is_free: number;
  name: string;
  price: number;
  discount_price: number;
  regular_price: number;
  quantity: number;
  cartID: string;
  variations: any;
}

const Page: React.FC = () => {
  const { cartCount } = useSelector((state: any) => state.cart);
  const { loading, user } = useSelector((state: any) => state.auth);
  const [data, setData] = useState<any>({ result: [] });
  const [open, setOpen] = useState(false);
  const [delCart, setDelCart] = useState<CartItem | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const getMyCarts = async () => {
    try {
      if (user && !loading) {
        if (user.role !== USER_ROLE.admin) {
          const res = await dispatch(myCart({})).then((r) => r.payload);
          setData(res);
        }
      } else {
        const t = localCartData();
        setData(t);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  const deleteCartF = async (item: CartItem) => {
    await dispatch(deleteCart({ ...item, id: item.id, cartCount }));
    getMyCarts();
  };

  const delCartF = () => {
    if (delCart) {
      deleteCartF(delCart);
      setOpen(false);
      setDelCart(null);
    }
  };

  useEffect(() => {
    getMyCarts();
  }, [user, loading]);

  const subtotal = calculateSubTotal(data.result);

  return (
    <div className="w-11/12 font-serif min-h-[40vh] mx-auto my-7">
      <h1 className="text-3xl">Cart</h1>
      <div className="my-3 flex flex-col lg:flex-row gap-8 relative">
        {/* Left Section - Cart Items */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          {  data.result.map((item: CartItem) => (
            <div
              key={item.id}
              className="border rounded-md p-3 bg-white shadow relative text-sm"
            >
              {item.is_free === 1 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded rotate-[-15deg]">
                  FREE
                </span>
              )}

              <Link href={`/product/${item.slug}`}>
                <Image
                  src={
                    item.images[0].image.includes("http")
                      ? item.images[0].image
                      : process.env.NEXT_PUBLIC_S3_IMG_URL + item.images[0].image
                  }
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded w-full object-cover max-h-[160px]"
                />
              </Link>

              <div className="mt-2">
                <h2 className="text-base font-bold">{item.name}</h2>
                <div className="text-gray-500 text-xs">
                  {item.variations?.length > 0 &&
                    item.variations.map((v: any, idx: any) => (
                      <div key={idx}>
                        <strong>{v.name}:</strong>{" "}
                        {v.options.map((op: any) => op.name).join(", ")}
                      </div>
                    ))}
                </div>

                <div className="flex justify-between font-bold items-center mt-3">
                  <p className="text-blue-950">
                    $
                    {item.discount_price > 0
                      ? item.discount_price
                      : item.regular_price}
                  </p>
                  <span className="text-sm font-medium">Qty: {item.quantity}</span>
                </div>

                <div className="flex justify-between mt-2 items-center">
                  <span className="font-semibold">
                    Total: ${calculatePrice(item)}
                  </span>
                  <button
                    onClick={() => {
                      setDelCart(item);
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

        {/* Right Section - Cart Summary for Desktop/iPad */}
        {data.result.length > 0 && (
          <div className="lg:w-[300px] w-full lg:sticky lg:top-20 bg-[#F9F9F9] text-black p-5 h-fit rounded-md shadow-md hidden sm:block">
            <h2 className="font-extrabold text-xl mb-4">Cart Summary</h2>
            <div className="flex justify-between text-base font-semibold mb-5">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
            <Link
              href="/checkout"
              className="bg-blue-800 transition-colors text-white py-2 px-4 rounded block text-center text-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}

        {/* Mobile Checkout Fixed Bottom Bar */}
        {data.result.length > 0 && (
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-md">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Total: $ {subtotal}</span>
              <Link
                href="/checkout"
                className="bg-blue-800 text-white px-4 py-2 rounded text-sm"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}

        <DeleteModal setOpen={setOpen} open={open} deleteRecord={delCartF} />
      </div>
    </div>
  );
};

export default Page;
