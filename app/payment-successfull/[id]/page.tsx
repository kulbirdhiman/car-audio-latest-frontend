"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const router = useRouter();
  const {id} = useParams()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center max-w-md w-full">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="flex items-center justify-center w-24 h-24 mx-auto bg-green-500 rounded-full"
        >
          <svg
            className="w-12 h-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l4 4L19 7"></path>
          </svg>
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-500 mt-2">
Welcome to car audio expertFamily
        </p>
        <p className="text-gray-500 mt-2">
          Your order #{id}  has been confirmed. Thank you for your purchase!
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;