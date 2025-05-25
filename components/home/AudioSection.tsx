"use client"
import React, { useEffect, useState } from 'react';
import TabComponent from './TabComponet';
import AudioProductCard from './AudioCard';
import { getAudioProduct } from "@/store/actions/home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import AudioProductCardSkeleton from "@/components/Skeleton/AudioProductCardSkeleton"
const AudioSection = () => {
  const [data, setData] = useState<any>({});
  const [apiHit, setApiHit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const list = async () => {
    try {
      const res = await dispatch(getAudioProduct({})).unwrap();

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
  console.log(data, "this is audio data")


  const tabDataa = [
 
    {
      id: 2,
      label: "SubWoofer's",
      content: (
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto sm:overflow-x-visible flex sm:flex-none space-x-4 sm:space-x-0 px-1">
          {data?.subBooferBox?.data?.length > 0
            ? data.subBooferBox.data.map((product: any, idx: number) => (
              <div key={idx} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCard {...product} />
              </div>
            ))
            : Array.from({ length: 5 }).map((_, idx) => (
              <div key={`skeleton-sub-${idx}`} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCardSkeleton />
              </div>
            ))}
        </div>
      ),
    },
    {
      id: 1,
      label: "Speaker's",
      content: (
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto sm:overflow-x-visible flex sm:flex-none space-x-4 sm:space-x-0 px-1">
          {data?.speakers?.data?.length > 0
            ? data.speakers.data.map((product: any, idx: number) => (
              <div key={idx} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCard {...product} />
              </div>
            ))
            : Array.from({ length: 5 }).map((_, idx) => (
              <div key={`skeleton-speaker-${idx}`} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCardSkeleton />
              </div>
            ))}
        </div>
      ),
    },
    {
      id: 3,
      label: "Amplifier's",
      content: (
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto sm:overflow-x-visible flex sm:flex-none space-x-4 sm:space-x-0 px-1">
          {data?.amplifier?.data?.length > 0
            ? data.amplifier.data.map((product: any, idx: number) => (
              <div key={idx} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCard {...product} />
              </div>
            ))
            : Array.from({ length: 5 }).map((_, idx) => (
              <div key={`skeleton-amp-${idx}`} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCardSkeleton />
              </div>
            ))}
        </div>
      ),
    },
    {
      id: 4,
      label: "subBooferBox",
      content: (
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto sm:overflow-x-visible flex sm:flex-none space-x-4 sm:space-x-0 px-1">
          {data?.subBooferBox?.data?.length > 0
            ? data.subBooferBox.data.map((product: any, idx: number) => (
              <div key={idx} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCard {...product} />
              </div>
            ))
            : Array.from({ length: 5 }).map((_, idx) => (
              <div key={`skeleton-box-${idx}`} className="min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <AudioProductCardSkeleton />
              </div>
            ))}
        </div>
      ),
    },
  ];



  return (
    <div className="w-[96%] mx-auto p-6">
      <TabComponent
        title=""
        tabs={tabDataa}
        TabClass=""
        TabComponentClass="flex justify-between mb-4"
      />
    </div>
  );
};

export default AudioSection;
