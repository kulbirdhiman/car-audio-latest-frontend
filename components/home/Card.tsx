// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({
  images,
  smallTitle,
  name,
  slug,
  regular_price,
  discount_price,
  in_stock,
}: {
  slug: string;
  images: { image: string }[];
  smallTitle: string;
  name: string;
  regular_price: number;
  discount_price: number;
  in_stock: string | number;
}) => {
  const imgSrc = images?.[0]?.image?.includes("http")
    ? images[0].image
    : `${process.env.NEXT_PUBLIC_S3_IMG_URL}${images?.[0]?.image}`;

  const isInStock = Number(in_stock) > 0;

  return (
    <Link
      href={`product/${slug}`}
      className="border border-gray-300 h-[420px] shadow-sm hover:shadow-md transition"
    >
      <Image
        height={500}
        width={500}
        priority
        src={imgSrc || "/placeholder.png"}
        alt={name}
        className="w-full h-[260px] object-fill"
      />
      <div className="p-3">
        <div className="text-xs line-clamp-1 text-gray-500">{name}</div>
        <h2 className="font-semibold line-clamp-1 text-base text-gray-800 mb-1">
          {name}
        </h2>
        <div
          className={`text-sm font-semibold mb-2 ${
            isInStock ? "text-green-600" : "text-pink-600"
          }`}
        >
          {isInStock ? "In Stock" : "Out of Stock"}
        </div>
        {discount_price ? (
          <div className=" text-base flex gap-2">
            <p className="text-gray-500 line-through">${regular_price}</p>
            <p className="text-xl font-bold text-red-600">${discount_price}</p>
          </div>
        ) : (
          <p className="font-semibold mt-2 text-base  text-gray-800">
            ${regular_price}
          </p>
        )}

        <button
          disabled={!isInStock}
          className={`px-4 py-2 text-sm border rounded-full ${
            isInStock
              ? "text-purple-600 border-purple-600 hover:bg-purple-50"
              : "text-gray-400 border-gray-300 cursor-not-allowed"
          } transition`}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
