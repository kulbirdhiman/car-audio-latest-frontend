"use client";

import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const ColorPriceFields: React.FC<any> = ({ values, setValues, errors,name }) => {
  const handleChange = (index:any, field:any, value:any) => {
    const newFields = [...values[name]];
    newFields[index][field] = value;
    setValues({ ...values, [name]: newFields });
  };

  const addFields = () => {
    setValues({
      ...values,
      [name]: [...(values.color || []), { color: "", price: 0 }],
    });
  };

  const removeField = (index:any) => {
    setValues({ ...values, [name]: values.color.filter((_:any, i:any) => i !== index) });
  };

  useEffect(()=>{
    console.log(errors.errors);
    
  },[errors])

  return (
    <div className="p-4">
      <label className="block text-lg font-medium mb-2">Colors & Prices</label>
      {(values[name] || []).map((field :any, index:any) => (
        <div
          key={index}
          className="flex gap-4 mb-2 items-center border p-2 rounded-lg shadow"
        >
          <div className="w-full">
            <input
              type="text"
              placeholder="Color"
              value={field.color || ""}
              onChange={(e) => handleChange(index, "color", e.target.value)}
              className="border p-2 rounded w-full"
            />
            {errors?.errors?.color_price?.[index] && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.errors?.color_price[index]}  
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="number"
              placeholder="Price"
              value={field.price > 0 ? field.price : 0}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              className="border p-2 rounded w-full"
            />
            {errors?.color_price?.[index] && index !== 0 && !field.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.color_price[index]}
              </p>
            )}
          </div>

          {index === 0 ? (
            <button
              onClick={addFields}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => removeField(index)}
              className="text-red-500 hover:text-red-700"
            >
              <MinusIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorPriceFields;

export const setColorPriceError = (values:any, setValues:any) => {
  const newErrors :any = {};
  let is_error = false;
  values.color_price.forEach((field:any, index:any) => {
    if (values.is_color_price == "1") {
      if (!field.color) {
        is_error = true;
        newErrors[index] = "Color is required";
      }

    }
  });
  console.log(newErrors);

  setValues((prevValues:any) => ({
    ...prevValues,
    errors: { ...prevValues.errors, color_price: newErrors },
  }));
  return is_error;
};
