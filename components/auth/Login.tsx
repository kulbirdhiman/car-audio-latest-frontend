"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, SignInData } from "@/store/actions/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { USER_ROLE } from "@/app/constants";
import { useRouter } from "next/navigation";
import { mapServerErrors } from "@/helpers/commonFunction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👈 Add icons

interface ServerError {
  errors: Record<string, string>;
}

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false); // 👈 Password toggle state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent,
    values: SignInData
  ) => {
    e.preventDefault();

    try {
      const res = await dispatch(signIn(values)).unwrap();
      console.log("Submitted values:", res);

      if (res.success) {
        if (res.data?.user.role === USER_ROLE.frontend_user) {
          router.push(`/user/orders`);
        }
        if (res.data?.user.role === USER_ROLE.admin) {
          router.push(`/admin/departments`);
        }
      }
    } catch (error) {
      console.log(error);
      const formErrors = mapServerErrors((error as ServerError).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row max-w-4xl border border-black gap-5 mx-auto">
      <div className="w-full md:w-1/2">
        <Image
          src="/main.png"
          alt="Login"
          width={500}
          height={500}
          className="h-full w-full hidden md:block"
        />
      </div>

      <div className="w-full md:w-1/2 p-3">
        <h2 className="text-2xl text-black font-bold mb-4">Login</h2>
        <form onSubmit={(e) => handleSubmit(e, formData)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-1">
              <label className="block text-black mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 text-black border rounded p-2 border-black"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="p-1 relative">
              <label className="block text-black mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"} // 👈 Toggle input type
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 border text-black rounded p-2 border-black pr-10"
              />
              <div
                className="absolute right-4 top-[48px] cursor-pointer text-xl text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              <div className="text-right mt-1">
                <Link href="/forgot-password" className="text-blue-500 text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
              Login
            </button>
          </div>
        </form>
        <p className="text-black mt-2 text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
