// app/product/[slug]/page.tsx

// app/product/[slug]/page.tsx

import { Metadata } from "next";
import Detail from "@/components/product/DetailProduct";
// import { getProductBySlug } from "@/helpers/CreateMetaData";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   try {
//     // const res = await getProductBySlug(params.slug);

//     // if (res?.success && res?.data?.result) {
//     //   const product = res.data.result;

//     //   return {
//     //     title: product.name,
//     //     description: product.description?.slice(0, 150),
//     //     openGraph: {
//     //       title: product.name,
//     //       description: product.description?.slice(0, 150),
//     //       images: [
//     //         {
//     //           url: product.images?.[0]?.url || "/default-image.jpg",
//     //         },
//     //       ],
//     //     },
//     //   };
//     // }
//   } catch (error) {
//     console.error("generateMetadata error:", error);
//   }

//   return {
//     title: "Product Not Found",
//     description: "This product could not be found.",
//   };
// }


// ✅ Client component (doesn't require product data server-side)
const Page = () => {
  return (
    <div className="container mx-auto lg:p-6 p-2">
      <div className="mx-auto w-full bg-white rounded-lg lg:p-8 p-2">
        <Detail />
      </div>
    </div>
  );
};

export default Page;
