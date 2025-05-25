"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import DynamicForm, { FormField } from "../globals/DynamicForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signIn, SignInData } from "@/store/actions/auth";
import { mapServerErrors } from "@/helpers/commonFunction";
import { log } from "console";
import { USER_ROLE } from "@/app/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Contact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [values, setValues] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
   
    {
        name: "First Name",
        label: "First Name",
        type: "text",
        // placeholder: "Enter your email",
        divClass : "w-1/2 p-3",
        labelClass : "",
        fieldClass : " w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500"
      },
      {
        name: "Last Name",
        label: "Last Name",
        type: "text",
        // placeholder: "Enter your email",
        divClass : "w-1/2 p-3",
        labelClass : "",
        fieldClass : " w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500"
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        // placeholder: "Enter your email",
        divClass : "w-1/2 p-3",

        labelClass : "",
        fieldClass : " w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500"
      },
      {
        name: "phone number",
        label: "Phone number",
        type: "number",
        divClass : "w-1/2 p-3",
        fieldClass : " w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500"
      },
      {
        name: "comment your message",
        label: "Comment your message",
        type: "text",
        // placeholder: "Enter your email",
        divClass : "w-full p-3",
        labelClass : "",
        fieldClass : " w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500"
      },
  ];

  const handleSubmit = async (
    e: React.FormEvent,
    values: SignInData,
    mode: string
  ) => {
    e.preventDefault();

    try {
      const res = await dispatch(signIn(values)).unwrap();
      console.log("Submitted values:", res);

      //  const apiResponse = res.payload
      if (res.success) {
        if (res.data?.user.role == USER_ROLE.admin) {
          router.push(`/admin/departments`);
        }
      }
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  return (
    <div className=" fl">
      <div className="text-lg">
        <DynamicForm
        formClassName="w-full flex flex-wrap text-cencer"
          submitTitle="Submit"
          values={values}
          setValues={setValues}
          errors={errors}
          formFields={formFields}
          handleSubmit={handleSubmit}
          mode="add"
        />
        <div className="flex mt-3 justify-between">          
        </div>
      </div>
     
    </div>
  );
};

export default Contact;
