"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import DynamicForm, { FormField } from "@/components/globals/DynamicForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signIn, SignInData } from "@/store/actions/auth";
import { mapServerErrors } from "@/helpers/commonFunction";
import { USER_ROLE } from "@/app/constants";
import { useRouter } from "next/navigation";
import TabComponent from "@/components/globals/TabComponent";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const Page: React.FC = () => {
  const tabs = [
    {
      id: 1,
      label: "User Profile",
      content: <Userprofile />,
    },
    {
      id: 2,
      label: "Change Password",
      content: <ChangePassword />,
    },
  ];

  return (
    <div className="w-[90%]">
      <div className="w-[100%]">
        <TabComponent  title="" tabs={tabs} />
      </div>
    </div>
  );
};

export default Page;

// ----------------------- Userprofile Component -----------------------
const Userprofile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [values, setValues] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (
    e: React.FormEvent,
    values: SignInData,
    mode: string
  ) => {
    e.preventDefault();

    try {
      const res = await dispatch(signIn(values)).unwrap();
      console.log("Submitted values:", res);

      if (res.success) {
        if (res.data?.user.role === USER_ROLE.admin) {
          router.push(`/admin/departments`);
        } else if (res.data?.user.role === USER_ROLE.frontend_user) {
          router.push(`/user/orders`);
        }
      }
    } catch (error) {
      console.log(error);
      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  const formFields: FormField[] = [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      divClass: "w-1/2 inline-block p-3",
      // fieldClass: "w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      divClass: "w-1/2 inline-block p-3",
      // fieldClass: "w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500",
    },
  
   
    {
      name: "country",
      label: "Country",
      type: "custom",
      customRender: () => (
        <div className="border-none">
          <CountrySelect
            inputClassName="w-full bg-transparent text-gray-900 border-none focus:outline-none"
            onChange={(e:any) => {
              setValues((prevValues) => ({
                ...prevValues,
                country: { id: e.id, name: e.name, iso3: e.iso3, iso2: e.iso2 },
                country_name: e.name,
              }));
            }}
            placeHolder="Select Country"
          />
        </div>
      ),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      divClass: "w-1/2 inline-block p-3",
      // fieldClass: "w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500",
    },  
    {
      name: "phone",
      label: "Phone",
      type: "text",
      divClass: "w-1/2 inline-block p-3",
      // fieldClass: "w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500",
    },
  ];

  return (
    <div className="text-lg w-[80%] mx-auto px-4">
      {/* <h1 className="text-2xl font-semibold font-serif">User Profile</h1> */}
      <DynamicForm
        formClassName="w-full"
        submitTitle="Submit"
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={formFields}
        handleSubmit={handleSubmit}
        mode="add"
      />
    </div>
  );
};

// ----------------------- ChangePassword Component (Placeholder) -----------------------
const ChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [values, setValues] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    {
      name: "password",
      label: "password",
      type: "password",
      divClass: "w-1/2 inline-block p-3",
      fieldClass: "w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500",
    },
    {
      name: "confirm Password",
      label: "confrim password",
      type: "password",
      divClass: "w-1/2 inline-block p-3",
      fieldClass: "w-full mt-1 p border-b border-gray-900 focus:outline-none focus:border-green-500",
    },
  
  ];
  return (
    <div className="w-[60%] my-6 mx-auto">
      {/* <h2 className="text-2xl font-semibold font-serif">Change Password</h2> */}
      <DynamicForm
        formClassName="w-full"
        submitTitle="Submit"
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={formFields}
        handleSubmit={()=>{}}
        mode="add"
      />
    </div>
  );
};
