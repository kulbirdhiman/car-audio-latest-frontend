"use client";

import React, { useEffect } from "react";
import { FormField } from "../DynamicForm";

interface TextareaInputProps {
  field: FormField;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  field,
  values,
  setFieldValue,
  errors,
}) => {


  // useEffect(()=>{
  //   console.log(values[field.name]);
    
  // },[values])
  return (
    <div className="" >
      <label className="block text-lg font-medium mb-1">{field.label}</label>
      <textarea
        value={values[field.name] || ""}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={field.placeholder}
        className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        rows={field.isMultiple ? 5 : 3} // Adjust rows if multiple input needed
      />
      {errors[field.name] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default TextareaInput;
