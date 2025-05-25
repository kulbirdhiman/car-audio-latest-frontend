import React from "react";
import {   FaShippingFast, FaTruck } from "react-icons/fa";
 
import PaymentSelector from "./PaymentMethod";

const OrderSummary: React.FC<any> = ({ data, apiHit }) => {
  return (
    <div>
      {" "}
      <div className="w-full md:col-span-1 col-span-3   my-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <h1 className="text-center text-2xl font-semibold border-b pb-3">
          Order Summary
        </h1>

        {/* Product Details */}
        <div className="py-4 border-b text-sm">
          <div className="flex justify-between items-start">
            <div className="w-[70%]">
              <h2 className="text-lg font-semibold">Product</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Subtotal</h2>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8 items-start">
            {data.result.map((row:any, i:any) => (
              <div key={i} className="flex justify-between gap-8">
                <p className="text-gray-700">
                  Car Stereo with SatNav BMW 5 Series (2004 - 2010) | V6 | 8.8
                  Inch
                </p>

                <p className="font-medium">$1,995.00</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="py-4 border-b">
          <h2 className="text-lg font-semibold">Shipping</h2>
          <div className="flex justify-between w-full mt-2">
            {/* Standard Delivery */}
            <div className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-100">
              <FaTruck className="text-blue-500 text-xl" />
              <div>
                <h3 className="font-medium">Standard Delivery</h3>
                <p className="text-xs text-gray-600">4-7 days</p>
              </div>
            </div>
            {/* Fast Delivery */}
            <div className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-100">
              <FaShippingFast className="text-red-500 text-xl" />
              <div>
                <h3 className="font-medium">Fast Delivery</h3>
                <p className="text-xs text-gray-600">1-2 days</p>
              </div>
            </div>
          </div>
          {/* <p className="font-medium mt-3">$25</p> */}
        </div>

        {/* Total */}
        <div className="my-3 flex justify-between text-lg font-bold">
          <h2>Total</h2>
          <h2>$2,000</h2>
        </div>

        {/* Terms & Conditions */}
        <p className="text-sm text-gray-600">
          By placing an order, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            terms & conditions
          </a>
          .
        </p>
        <div className="flex items-center my-2 text-xs">
          <input type="checkbox" id="terms" className="mr-2 accent-black" />
          <label htmlFor="terms">
            I have read and agree to the website terms
          </label>
        </div>
        {/* <PaymentSelector /> */}
      </div>
    </div>
  );
};

export default OrderSummary;
