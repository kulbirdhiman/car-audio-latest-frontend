"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import DynamicForm, { FormField } from "../globals/DynamicForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signUpAction, SignUpData } from "@/store/actions/auth";
import { mapServerErrors } from "@/helpers/commonFunction";
// import { log } from "console";
import "react-country-state-city/dist/react-country-state-city.css";

// import { USER_ROLE } from "@/app/constants";
import { useRouter } from "next/navigation";

import { CountrySelect } from "react-country-state-city";
import Link from "next/link";
const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [countries, setCountrty] = useState();
  const [values, setValues] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    country: {
      id: "",
      name: "",
    },
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    {
      name: "name",
      label: "First name",
      type: "text",
      // placeholder: "Enter your email",
      // divClass : "w-1/2 inline-block p-1",
      // labelClass : "",
      // fieldClass : " w-full mt-1 border rounded border-gray-400"
      // fieldClass : " w-full mt-1 border rounded border-gray-200 p-1"
    },
    {
      name: "last_name",
      label: "Last name",
      type: "text",
      // placeholder: "Enter your email",
      // divClass : "w-1/2 inline-block p-1",
      // labelClass : "",
      // fieldClass : " w-full mt-1 border rounded border-gray-400"
      // fieldClass : " w-full mt-1 border rounded border-gray-200 p-1"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      // placeholder: "Enter your email",
      // divClass : "w-1/2 inline-block p-1",

      // labelClass : "",
      // fieldClass : " w-full mt-1 border rounded border-gray-400"
      // fieldClass : " w-full mt-1 border rounded border-gray-200 p-1"
    },

    {
      name: "phone",
      label: "phone number",
      type: "number",
      // divClass : "w-1/2 inline-block p-1",
      // fieldClass : " w-full mt-1 border rounded border-gray-200 p-1"
    },
    {
      name: "country",
      label: "Country",
      type: "custom",
      customClass:"col-span-2",
      customRender: () => {
        return (
          <div className="border-none  ">
            <label className="block text-lg font-medium mb-1">Select Country</label>
            <CountrySelect
              inputClassName="w-full h-8 mt- bg-transparent text-gray-900 border-none focus:outline-none"
              onChange={(e:any) => {
                setValues((prevValues) => ({
                  ...prevValues,
                  country: {
                    id: e.id,
                    name: e.name,
                    iso3: e.iso3,
                    iso2: e.iso2,
                  },
                  country_name: e.name,
                }));
              }}
              placeHolder="Select Country"
            />
          </div>
        );
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      // divClass : "w-full p-1",
      // labelClass : " left-0 top-4 text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
      // fieldClass : "peer w-full mt-1 p-2 border-b border-gray-900 focus:outline-none focus:border-green-500"
    },
    {
      name: "confirmPassword",
      label: " confrim Password",
      type: "password",
      // divClass : "w-full p-1",
      // labelClass : " left-0 top-4 text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
      // fieldClass : "peer w-full mt-1 p-2 border-b border-gray-900 focus:outline-none focus:border-green-500"
    },
  ];

  const handleSubmit = async (
    e: React.FormEvent,
    values: SignUpData,
    mode: string
  ) => {
    e.preventDefault();

    try {
      const res = await dispatch(signUpAction(values)).unwrap();
      console.log("Submitted values:", res);

      //  const apiResponse = res.payload
      if (res.success) {
        router.push(`/user/orders`);
      }else{
        console.log("res",res);
        
        const formErrors = mapServerErrors((res as any).errors, setErrors);
      }
    } catch (error) {
      

      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  return (
    <div className=" fl">
      <div className="text-lg">
        <DynamicForm
          formClassName="grid grid-cols-2 gap-2"
          submitTitle="Sign Up"
          values={values}
          setValues={setValues}
          errors={errors}
          formFields={formFields}
          handleSubmit={handleSubmit}
          mode="add"
          submitClass="col-span-2 flex justify-center mt-6"
          submitBtnClass='w-1/2 mx-auto bg-black text-white rounded-md px-4 py-2 '
        />
        <div className="flex mt-3 justify-between">
          <p className="text-sm ">
            already have Account ?{" "}
            <Link
              href="/sign-in"
              className="text-blue-800 font-bold cursor-pointer"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
