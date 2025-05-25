"use client";
import { ORDER_STATUS, SHIP_TYPE, SHIPPMENT_METHOD } from "@/app/constants";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { useState } from "react";

interface YearRangePickerProps {
  values: Record<string, any>;
  setValues: (values: Record<string, any>) => void;
}

const UpdateOrderFields: React.FC<YearRangePickerProps> = ({
  values,
  setValues,
}) => {
  const currentYear = new Date().getFullYear();

  const shipMethodOption = [
    {
      value: SHIPPMENT_METHOD.australia_post,
      label: "Australia Post",
    },
    {
      value: SHIPPMENT_METHOD.direct_freight_express,
      label: "Direct Fright Express",
    },
  ];

  const shipTypeOption = [
    { value: SHIP_TYPE.automatice, label: "Automatic" },
    { value: SHIP_TYPE.manual, label: "Manual" },
  ];

  return (
    <div>
      {values?.status == ORDER_STATUS.shipped && (
        <>
          <label className="block ">
            <span className="flex justify-between items-center text-lg font-medium">
              Ship method
            </span>
          </label>
          <Select
            options={shipMethodOption}
            value={shipMethodOption?.find(
              (option) => option.value === values?.ship_method
            )}
            onChange={(selectedOptions) => {
              const newValue = (selectedOptions as { value: number })?.value;

              setValues({ ...values, ship_method: newValue });
            }}
            isSearchable
            className="block w-full"
          />
        </>
      )}

      {(values?.ship_method == SHIPPMENT_METHOD.australia_post ||
        values?.ship_method == SHIPPMENT_METHOD.direct_freight_express) && (
        <>
          <label className="block ">
            <span className="flex justify-between items-center text-lg font-medium">
              Ship to Automatic or manual
            </span>
          </label>
          <Select
            options={shipTypeOption}
            value={shipTypeOption?.find(
              (option) => option.value === values?.type
            )}
            onChange={(selectedOptions) => {
              const newValue = (selectedOptions as { value: number })?.value;

              setValues({ ...values, type: newValue });
            }}
            isSearchable
            className="block w-full"
          />
        </>
      )}

      {values?.type == SHIP_TYPE.manual && (
        <>
          <label className="block ">
            <span className="flex justify-between items-center text-lg font-medium">
              Tracking id
            </span>
          </label>
          <input
            type={"text"}
            className={` "mt-1 block w-full border rounded-lg py-2 px-3 focus:ring focus:ring-primary-200 focus:ring-opacity-50" `}
            placeholder={"Tracking id"}
            value={values.tracking_number}
              onChange={(e) => setValues({...values, tracking_number : e.target.value})}
          />
        </>
      )}
    </div>
  );
};

export default UpdateOrderFields;
