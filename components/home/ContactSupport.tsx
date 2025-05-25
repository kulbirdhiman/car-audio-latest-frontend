"use client";
import React, { useState } from "react";
import DynamicForm, { FormField } from "../globals/DynamicForm";
interface ContactSupportProps {
  containerClass?: string;
  innerDivClass?: string;
}

const ContactSupport:React.FC<ContactSupportProps> = ({containerClass,innerDivClass}) => {
  const [values, setValues] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
   
    {
        name: "name",
        label: "Name",
        type: "text",
        divClass : "w-full  inline-block p-2",
        labelClass : "block text-base font-bold text-gray-700",
        fieldClass : " w-full mt-1 p-2 border rounded-md border-gray-900 focus:ring-2 focus:ring-blue-500 shadow-sm"

      },
      {
        name: "car_make",
        label: "Car make",
        type: "text",
        divClass : "w-full  inline-block p-2",
        labelClass : "block text-base font-bold text-gray-700",
        fieldClass : "w-full mt-1 p-2 border rounded-md border-gray-900 focus:ring-2 focus:ring-blue-500 shadow-sm"

      },
      {
        name: "phone",
        label: "Phone",
        type: "number",
        divClass : "w-full  inline-block p-2",
        labelClass : "block text-base font-bold text-gray-700",
        fieldClass : "w-full mt-1 p-2 border rounded-md border-gray-900 focus:ring-2 focus:ring-blue-500 shadow-sm"

      },
     
      {
        name: "car_model",
        label: "Car model",
        type: "text",
        labelClass : "block text-base font-bold text-gray-700",
        divClass : "w-full  inline-block p-2",
        fieldClass : " w-full mt-1 p-2 border rounded-md border-gray-900 focus:ring-2 focus:ring-blue-500 shadow-sm"
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        divClass : "w-full  inline-block p-2",
        labelClass : "block text-sm font-bold p-1 text-gray-700 mb-1",
        fieldClass : "w-full p-2 border rounded-md border-gray-900 focus:ring-2 focus:ring-blue-500 shadow-sm"

      },
     
      {
        name: "message",
        label: "Message",
        type: "text",
        labelClass : "block text-base font-bold text-gray-700",
        divClass : "w-full  inline-block p-2  ",
        fieldClass : "w-full mt-1 p-2 border rounded-md border-gray-900 focus:ring-2 focus:ring-blue-500 shadow-sm h-24 resize-none"
      },
     
    ];


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await dispatch(contactSupport(values)).unwrap();
//       setValues({
//         name: "",
//         last_name: "",
//         email: "",
//         phone: "",
//         message: "",
//       })
//       console.log("Submitted values:", res);
//     } catch (error) {
//       console.log("Error occurred while submitting the form");
//       const formErrors = mapServerErrors((error as any)?.errors, setErrors);
//       console.error("Submission failed:", formErrors);
//     }
//   };

  return (
    <section className="bg-white text-gray-900 flex items-center justify-center ">
      <div className={` ${containerClass? containerClass : "w-full flex flex-col sm:flex-col md:flex-row justify-around gap-8 bg-gray-50 shadow-lg rounded-xl p-8"} `}>
        <div className={`${innerDivClass? innerDivClass : "flex flex-col justify-center text-center md:text-left px-6"} `}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Can’t find what you’re looking for?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            <span className="text-blue-600 font-medium">Contact our support team</span>—we’re happy to help!
          </p>
          <p className="text-gray-700">
            Fill out the form, and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex justify-center">
          <DynamicForm
            formClassName="bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 sm:w-[33rem] xl:w-[46rem] mx-auto"
            submitTitle="Submit"
            values={values}
            setValues={setValues}
            errors={errors}
            formFields={formFields}
            handleSubmit={()=>{}}
            mode="add"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;