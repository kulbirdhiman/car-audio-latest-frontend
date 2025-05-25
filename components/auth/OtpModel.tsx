"use client";

import { useState } from "react";
import OtpInput from "react-otp-input";
import { motion } from "framer-motion";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { verifyOtp } from "@/store/actions/auth";

 const  OtpModal:React.FC<any> = ({
  setValues,
  values,
  isOpen,
  onClose,
  email,
  isOtpVerified,
  setIsOtpVerified,
  setIsModalOpen
  
})=> {
 
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


    const dispatch = useDispatch<AppDispatch>();
  if (!isOpen) return null;

  const handleOtpVerification = async () => {
   try {
   const res =   await dispatch(verifyOtp({ ...values })); 
   console.log("res===",res);
   if((res.payload as any).success){
    setIsOtpVerified (true);
    setIsModalOpen(false)
   }
   
    //   setIsModalOpen(true);
    } catch (error) {}
  };

  const handlePasswordReset = () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successfully!");
    onClose();
  };

  const handleChange = (e:any)=>{
    setValues({...values,otp:e})

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg w-[30rem] flex flex-col items-center"
      >
        {!isOtpVerified ? (
          <>
            <h2 className="text-2xl font-bold text-gray-700 text-center">
              Enter OTP
            </h2>
            <p className="text-sm text-black text-center mt-2">
              OTP sent to <strong className="text-gray-700">{email}</strong>
            </p>

            <OtpInput
              value={values.otp}
              onChange={handleChange}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-12 h-12 text-xl border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              )}
              containerStyle="flex justify-center gap-2 mt-4"
            />

            <button
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleOtpVerification}
            >
              Verify OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-700 text-center">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
export default OtpModal