import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { SiAfterpay, SiGooglepay } from "react-icons/si";
import { H1Icon } from "@heroicons/react/24/solid";
import { FaCcApplePay } from "react-icons/fa";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // console.log("this is listcard ",product)
  const discountPercentage =
    product.discount_price > 0
      ? Math.round(
        ((product.regular_price - product.discount_price) /
          product.regular_price) *
        100
      )
      : 0;

  const imageUrl =
    product.images?.[0]?.image?.includes("http")
      ? product.images[0].image
      : `${process.env.NEXT_PUBLIC_S3_IMG_URL}${product.images?.[0]?.image || ""}`;

  return (
    <div className="w-full border-gray-200 relative max-w-[450px] mx-auto border bg-white  min-h-[350px] flex flex-col ">
      {/* Discount Tag */}
      {product.discount_price > 0 && (
        <div className="absolute top-0 right-0 z-20 bg-red-500 text-white text-xs font-semibold py-1 px-4 rounded-bl-lg">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} passHref>
        <div className="relative w-full h-[170px] md:h-[240px] bg-gray-100 rounded-t-lg cursor-pointer">
          <Image
            src={imageUrl}
            alt={product.name || "Product Image"}
            width={300}
            height={300}
            className=" object-cover h-full"
            loading="lazy"
            style={{ backgroundColor: "#f3f4f6" }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-2">
        <p className="font-extralight text-gray-400 text-xs line-clamp-1">
          {product.name}
        </p>

        <Link
          href={`/product/${product.slug}`}
          passHref
          className="font-bold text-black line-clamp-1 text-sm"
        >
          {product.name}
        </Link>

        {/* Payment Icons */}
        {/* <div className="flex text-black text-xl gap-2 mt-1">
          <SiAfterpay />
          <SiGooglepay />
          <FaCcApplePay />
        </div> */}

        {/* Stock Info */}
        {product.in_stock > 0 ? (
          <p className="text-xs my-2 text-green-700 font-bold">In Stock</p>
        ) : (
          <p className="text-xs my-2 text-red-700 font-bold">Out Stock</p>

        )}

        {/* Price Info */}
        <div className="mb-2 flex gap-3 items-center">
          <p className="text-sm text-gray-900">
            <span className="font-semibold text-green-900 text-base">
              $
              {product.discount_price && product.discount_price > 0
                ? product.discount_price
                : product.regular_price}
            </span>
          </p>

          {product.discount_price > 0 && (
            <p className="text-sm text-red-500 line-through">
              ${product.regular_price}
            </p>
          )}

          {/* <p className="text-black text-sm">
            Wholesale:{" "}
            {product.wholesale_price !== 0 ? product.wholesale_price : "--"}
          </p> */}
        </div>

        {/* Buy Now Button */}
        <Link
          href={`/product/${product.slug}`}
          className="flex items-center justify-center gap-2 mx-1 w-[140px] py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FiShoppingBag className="text-base" />
          <span className="text-sm">BUY NOW</span>
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;
