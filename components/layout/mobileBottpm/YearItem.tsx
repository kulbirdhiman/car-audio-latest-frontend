"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const YearItem: React.FC<{
  category:any;
  setOpen: (open: boolean) => void;
  year: any;
  model: any;
}> = ({ year, model,category, setOpen }) => {
  const router = useRouter();

  // Define functions inside the component
  const handleClick = () => {
    setOpen(false)
    const params = new URLSearchParams({
      model: model.slug,
      year: year.slug,
    });
    // const url = `/product/list?${params.toString()}`;
    console.log("category",category);
    
    const url = `/products/${category.slug}/${model.slug}/${year.slug}`;

    router.push(url);
  };

  return (
    <p
      key={year.id}
      className="text-gray-600 text-xs p-1 cursor-pointer"
      onClick={handleClick}
    >
      {year.name}
    </p>
  );
};
