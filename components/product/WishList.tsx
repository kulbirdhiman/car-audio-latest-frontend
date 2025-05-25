import React from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";

interface WishlistCardProps {
  image: string;
  title: string;
  subtitle?: string;
  price: number;
  onRemove?: () => void;
  onAddToCart?: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  image,
  title,
  subtitle,
  price,
  onRemove,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition">
      <div className="w-full sm:w-1/4">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="rounded-lg object-cover w-full h-auto"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between w-full">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            <p className="text-md font-bold text-purple-700 mt-2">
              ${price.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAddToCart}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
              title="Add to Cart"
            >
              <MdAddShoppingCart size={18} />
            </button>
            <button
              onClick={onRemove}
              className="bg-red-100 text-red-500 p-2 rounded-full hover:bg-red-200 transition"
              title="Remove from Wishlist"
            >
              <FaTrashAlt size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
