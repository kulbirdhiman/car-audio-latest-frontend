import React from "react";
import Image from "next/image";
import SignUp from "@/components/auth/SignUp";
const SignupPage = () => {
  return (
    <section className="flex flex-col md:flex-row w-[100%] md:w-[80%] h-auto mx-auto mt-8 bg-white text-black p-6 shadow-lg rounded-lg">
      {/* Left Section - Signup Form */}

      {/* Right Section - Info & Map */}
      <div className="md:w-1/2 p-5">
        <Image
          className="w-full h-full rounded-md shadow-lg"
          src="/main.png"
          width={1000}
          height={2000}
          alt="this is image"
        />
      </div>
      <div className="md:w-1/2 p-6">
        <h1 className="text-4xl text-center mx-4 mb-3">Sign Up</h1>
        <SignUp />
      </div>
    </section>
  );
};

export default SignupPage;
