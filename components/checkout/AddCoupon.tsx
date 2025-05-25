import React from "react";
import { FaTimes } from "react-icons/fa";

interface AddCouponProps {
  applyCouponF: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
}

const AddCoupon: React.FC<AddCouponProps> = ({
  applyCouponF,
  isOpen,
  setIsOpen,
  couponCode,
  setCouponCode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 bg-white rounded shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Apply Coupon
        </h2>

        <div className="space-y-4">
          <input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            type="text"
            className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            placeholder="Enter coupon code"
          />

          <button
            onClick={applyCouponF}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
