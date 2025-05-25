"use client";
import React, { useState } from "react";

import AddProduct from "@/components/admin/AddProduct";

const Page = () => {
  const [values, setValues] = useState<Record<string, any>>({
    images: [{}],
    color_price: [{}],
  });

  return (
    <div className="">
      <AddProduct values={values} setValues={setValues} />
    </div>
  );
};

export default Page;
