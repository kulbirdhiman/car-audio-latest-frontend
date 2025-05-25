"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import AddProduct from "@/components/admin/AddProduct";
import { detailProduct } from "@/store/actions/admin/product";
import { useParams } from "next/navigation";

const Page = () => {
  const { slug } = useParams();

  const [values, setValues] = useState<Record<string, any>>({
    images: [{}],
    color_price: [{}],
  });

  const dispatch = useDispatch<AppDispatch>();

  const getDetail = async () => {
    try {
      const res = await dispatch(detailProduct({ slug })).unwrap();

      if (res.success) {
        console.log(res.data);
        setValues(res.data.result)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="">
      <AddProduct values={values} setValues={setValues} />
    </div>
  );
};

export default Page;
