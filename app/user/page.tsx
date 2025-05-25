"use client";

import React, { useState } from "react";
import DynamicForm, { FormField } from "@/components/globals/DynamicForm";

const Page = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formFields: FormField[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      divClass: "w-1/2 p-2",
      labelClass: "font-medium text-gray-700",
      fieldClass:
        "w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      divClass: "w-1/2 p-2",
      labelClass: "font-medium text-gray-700",
      fieldClass:
        "w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      divClass: "w-1/2 p-2",
      labelClass: "font-medium text-gray-700",
      fieldClass:
        "w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    },
    {
      name: "phoneNumber",
      label: "Phone number",
      type: "text",
      divClass: "w-1/2 p-2",
      labelClass: "font-medium text-gray-700",
      fieldClass:
        "w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      divClass: "w-full p-2",
      labelClass: "font-medium text-gray-700",
      fieldClass:
        "w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!values.firstName) newErrors.firstName = "First name is required";
    if (!values.lastName) newErrors.lastName = "Last name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully", values);
    }
  };

  return (
    <div className="w-[90%] mx-auto text-black flex space-x-6 p-8 bg-gray-50 min-h-screen">

      {/* Sidebar */}
      {/* <div className="w-[20%] lef bg-white shadow-md rounded-lg p-6">
        <h2 className="font-semibold text-xl mb-4 text-gray-800">My Account</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="cursor-pointer hover:text-blue-600 font-medium">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-600 font-medium">Account Details</li>
          <li className="cursor-pointer hover:text-blue-600 font-medium">My Orders</li>
          <li className="cursor-pointer hover:text-blue-600 font-medium">Wishlist</li>
          <li className="cursor-pointer hover:text-blue-600 font-medium">Logout</li>
        </ul>
      </div> */}

      {/* Form Section */}
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">User Account Details</h1>
       
          <DynamicForm
            formClassName="w-full flex flex-wrap"
            submitTitle=""
            values={values}
            setValues={setValues}
            errors={errors}
            formFields={formFields}
            handleSubmit={handleSubmit}
            mode="add"
          />
          <div className="mt-4 text-right">
            <p className="text-blue-600 font-medium text-sm inline-block cursor-pointer">
              Change Password?
            </p>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Update Account
          </button>
      
      </div>
    </div>
  );
};

export default Page;
