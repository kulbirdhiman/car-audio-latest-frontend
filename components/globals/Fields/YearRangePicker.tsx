"use client";

import { useState } from "react";

interface YearRangePickerProps {
  values: Record<string, any>;
  setValues: (values: Record<string, any>) => void;
}

const YearRangePicker: React.FC<YearRangePickerProps> = ({
  values,
  setValues,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <label className="block ">
        <span className="flex justify-between items-center text-lg font-medium">
          Year
        </span>
      </label>
      <div className="flex items-center mt-1">
        <input
          type="number"
          className="block w-full border-2 border-gray-400 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white text-black text-base font-medium h-10 px-4 py-3"
          placeholder="From"
          name="from"
          value={values.from || ""}
          onChange={(e) =>
            setValues({ ...values, from: Number(e.target.value) || "" })
          }
          min={1900}
          max={currentYear}
        />
        <span className="mx-2">-</span>
        <input
          type="number"
          className="block w-full border-2 border-gray-400 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white  text-black rounded-r-lg text-base font-medium h-10 px-4 py-3"
          placeholder="To"
          name="to"
          value={values.to || ""}
          onChange={(e) =>
            setValues({ ...values, to: Number(e.target.value) || "" })
          }
          min={1900}
          max={currentYear}
        />
      </div>
    </div>
  );
};

export default YearRangePicker;