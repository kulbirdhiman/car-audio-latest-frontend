"use client"
import React from "react";
import carplay from "/public/carplyyy.png";
import Image from "next/image";

const HomeAudio:React.FC<any> = ({ products }) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="font-avenir-bold text-xl">Up to 60% off </h1>
      <Image
        src={"/images/amp.jpeg"}
        alt="Main Product"
        width={400}
        height={500}
        className="w-[400px] my-5 h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <h1 className="font-avenir-bold text-2xl  ">
        Kayhan Amplifier 3000 Watt 5 Channel
      </h1>
      <p>Starting $80*</p>
      <p>4 interest-free payments of $93.75</p>
    </div>
  );
};

export default HomeAudio;
