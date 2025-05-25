"use client";
import { useEffect, useState } from "react";
import OtpModal from "@/components/auth/OtpModel";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { sendOtp, setPassword } from "@/store/actions/auth";
import { useRouter } from "next/navigation";
import { mapServerErrors } from "@/helpers/commonFunction";

export default function ForgotPasswordInput() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [isOtpVerified, setIsOtpVerified] = useState(false);
 
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await dispatch(sendOtp({ ...values }));
 
      if ((res.payload as any).success) {
        setIsModalOpen(true);
      }
 
    } catch (error) {}
  };

  const handlePassword = async (e:any) => {
    e.preventDefault();
    try {
      const res = await dispatch(setPassword({ ...values }));
      console.log("res===", (res.payload as any).success);
      if ((res.payload as any).success) {
        router.push(`/user/orders`);
      }else{
        const formErrors = mapServerErrors((res.payload  as any).errors, setErrors);
      }

      //   setIsModalOpen(true);
    } catch (error) {
            const formErrors = mapServerErrors((error as any).errors, setErrors);
    }
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 px-4">
      {/* Email Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-sm text-center mb-4">
          Enter your email to receive a reset link.
        </p>

        <input
          disabled={isOtpVerified}
          type="email"
          placeholder="Enter your email"
          value={(values as any).email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!isOtpVerified && (
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Otp
          </button>
        )}

        {isOtpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={(values as any).password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password &&
            <p className="text-red-400" >{errors.password}</p>
            }

            <input
              type="password"
              placeholder="Confirm Password"
              value={(values as any).confirmPassword}
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
              className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  {errors.confirmPassword &&
            <p className="text-red-400" >{errors.confirmPassword}</p>
            }

            <button
              onClick={handlePassword}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Reset Password
            </button>
          </>
        )}
      </div>

      {/* OTP Modal */}
      <OtpModal
        setIsModalOpen={setIsModalOpen}
        isOtpVerified={isOtpVerified}
        setIsOtpVerified={setIsOtpVerified}
        values={values}
        setValues={setValues}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
      />
    </div>
  );
}
