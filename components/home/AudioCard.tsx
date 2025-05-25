import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const AudioProductCard = ({ images,
  smallTitle,
  name,
  slug,
  regular_price,
  discount_price,
  in_stock, }: {
    slug: string;
    images: { image: string }[];
    smallTitle: string;
    name: string;
    regular_price: number;
    discount_price: number;
    in_stock: string | number;
  }) => {
  const imgSrc =
    images?.[0]?.image?.includes("http")
      ? images[0].image
      : `${process.env.NEXT_PUBLIC_S3_IMG_URL}${images?.[0]?.image}`;
  return (
    <div className="max-w-xs border h-[340px]  shadow-sm ">
      <Link href={`product/${slug}`}>
        <Image
          height={500}
          width={500}
          src={imgSrc}
          alt={name}
          className="w-full h-40 object-contain  "
        />
        <div className='p-3' >
          <h2 className="font-semibold line-clamp-2 text-base text-gray-800 ">
            {name}
          </h2>
          <div className="text-xs line-clamp-1 text-gray-500">{name}</div>
          {discount_price ? (
            <div className=" text-base flex gap-2">
              <p className="text-gray-500 line-through">${regular_price}</p>
              <p className="mt-3 text-xl font-medium   text-red-600">
                ${discount_price}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xl font-medium  text-black">
              Price: ${regular_price}
            </p>
          )}
          <div className="text-sm text-pink-600 font-semibold mb-2">in Stock</div>
          <div className="flex gap-2">
            {/* <button className="px-4 py-1 border rounded-full text-sm border-purple-600 text-purple-600 hover:bg-purple-50 transition">
              Buy now
            </button> */}
            <button className="px-4 py-1 rounded-full text-sm bg-purple-700 text-white hover:bg-purple-800 transition">
              Add to Cart
            </button>
          </div>
        </div></Link>
    </div>
  );
};

export default AudioProductCard;
