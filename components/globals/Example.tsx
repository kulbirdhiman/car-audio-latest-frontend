"use client"
import React, { useState } from "react";
import DynamicForm, { FormField } from "./DynamicForm";
import { toast } from "react-hot-toast";
 
 

const DynamicFormExample: React.FC = () => {
//   const [values, setValues] = useState<FormValues>({ name: "", age: "", country: "" });
const [values, setValues] = useState<Record<string, any>>({ name: "", age: "", country: "" });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields:FormField[] = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { name: "age", label: "Age", type: "number", placeholder: "Enter your age" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { value: "usa", label: "USA" },
        { value: "india", label: "India" },
        { value: "australia", label: "Australia" },
      ],
    },
  ];
 

  

  const handleSubmit = (e: React.FormEvent, values: Record<string, any>, mode: string) => {
    e.preventDefault();
    console.log("Submitted values:", values);
  };
  

 
  const showToast = () => {
    toast.success("Hello, this is a success message!");
  };

  return (
    <div className="p-6">

<button
        onClick={showToast}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Show Toast
      </button>
      <h2 className="text-xl font-bold mb-4">Dynamic Form Example</h2>
      <DynamicForm
      submitTitle="yyy"
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

export default DynamicFormExample;
