"use client";
import React, { useEffect, useState } from "react";
import { getWeeklyHighlights } from "@/store/actions/home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import TabComponent from './TabComponet';
import ProductCard from './Card';
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
const WhatWeOffer = () => {
  const [data, setData] = useState<any>({});
  const [apiHit, setApiHit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const list = async () => {
    try {
      const res = await dispatch(getWeeklyHighlights({})).unwrap();

      if (res.success) {
        console.log("res.data.result", res?.data?.result);
        setApiHit(true);
        setData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list();
  }, []);

  const tabDataa = [
    {
      id: 1,
      label: "Android stereo's",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {(data?.android?.data ?? []).map((product: any, idx: number) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      ),
    },
    {
      id: 2,
      label: "Linux headunit's",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {(data?.linux?.data ?? []).map((product: any, idx: number) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      ),
    },
    {
      id: 3,
      label: "Carplay Module's",
      content: (
        <div className="grid grid-cols-2  md:grid-cols-5 gap-6">
          {(data?.car_play?.data ?? []).map((product: any, idx: number) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      ),
    },
  ];


  return (
    <div className="w-[96%] mx-auto p-6">
      {apiHit ? (
        <TabComponent
          title="What We Offer"
          tabs={tabDataa}
          TabClass="float-left flex gap-4"
          TabComponentClass="md:flex justify-between mb-2"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WhatWeOffer;
