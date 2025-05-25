"use client";

import { useState } from "react";
import DynamicForm, { FormField } from "../globals/DynamicForm";
import { CountrySelect, StateSelect } from "react-country-state-city";

const ShippingAddress : React.FC<any>= ({
  setSelectedShipping,
  setSelectedMethod,
  shippingAddress,
  setShippingAddress,
  sameAsBilling,
  setSameAsBilling,
  shippingErrors,
  setShippingPrice
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [country, setCountrty] = useState();
  const handleSubmit = () => {
 
  };

  return (
    <div className=" p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Shipping Address</h1>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="sameAsBilling"
          className="mr-2"
          checked={sameAsBilling}
          onChange={() => {
            setSameAsBilling(!sameAsBilling);
            setSelectedMethod("");
            setSelectedShipping(false);
            setShippingPrice(0)
          }}
        />
        <label htmlFor="sameAsBilling" className="text-lg">
          Same as Billing Address
        </label>
      </div>

      {/* Address Form (Hidden when sameAsBilling is checked) */}
      {!sameAsBilling && (
        <div className="border p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Enter Details</h2>
          <DynamicForm
            formClassName="grid grid-cols-2 gap-4 item-center "
            values={shippingAddress}
            setValues={setShippingAddress}
            errors={shippingErrors}
            formFields={getformFields(
              shippingAddress,
              setShippingAddress,
              shippingErrors,
              country,
              setCountrty
            )}
            handleSubmit={handleSubmit}
            mode="add"
          />
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
const getformFields = (
  shippingAddress:any,
  setShippingAddress:any,
  shippingErrors:any,
  country:any,
  setCountrty:any
): FormField[] => {
  return [
    {
      name: "name",
      label: "First Name",
      type: "text",
      //   placeholder: "Enter your first name",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass:
        "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
      divClass: "relative w-full",
    },

    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      //   placeholder: "Enter your last name",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass:
        "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700 ",
      placeholder: "Enter Email name",
    },
    {
      name: "phone",
      label: "Phone",
      type: "number",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700 ",
      placeholder: "Enter phone number",
    },
    {
      name: "country",
      label: "Country",
      type: "custom",

      customRender: () => {
        return (
          <div className="border-none">
            <label className="block  text-lg font-medium">
              Select Countries
            </label>
            <CountrySelect
              inputClassName="w-full bg-transparent text-gray-900  border-none focus:outline-none"
              // className="w-full border-none  focus:border-green-500 transition-all duration-200"
              onChange={(e:any) => {
                console.log(e);
                setShippingAddress({ ...shippingAddress, country:{id:e.id,name:e.name,iso3:e.iso3,iso2:e.iso2}});
                setCountrty(e);
              }}
              placeHolder="Select Country"
            />
            {shippingErrors.country && (
              <p className="text-red-400 ">{shippingErrors.country}</p>
            )}
          </div>
        );
      },
    },
    {
      name: "state",
      label: "State ",
      type: "custom",
      customRender: () => {
        return (
          <div className="c">
            <label className="block  text-lg font-medium">States</label>
            <StateSelect
              countryid={(country as any)?.id}
              className="peer w-full border-b border-gray-900 focus:outline-none focus:border-green-500 "
              onChange={(e:any) => {
                setShippingAddress({ ...shippingAddress, state:{id:e.id,name:e.name,state_code:e.state_code} });
              }}
              placeHolder="Select Country"
            />
            {shippingErrors.state && (
              <p className="text-red-400 ">{shippingErrors.state}</p>
            )}
          </div>
        );
      },
    },
    {
      name: "city",
      label: "city",
      type: "text",
      //   placeholder: "Enter your Company name",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass:
        "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
    },

    {
      name: "postcode",
      label: "Zip code",
      type: "email",
      //   placeholder: "Enter your Street address",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass:
        "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
    },
  ];
};
const formFields: FormField[] = [
  {
    name: "name",
    label: "name",
    type: "text",
    //   placeholder: "Enter your first name",
    fieldClass:
      "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
    labelClass:
      "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
    divClass: "relative w-full",
  },

  {
    name: "Adress",
    label: "Last Name",
    type: "text",
    //   placeholder: "Enter your last name",
    fieldClass:
      "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
    labelClass:
      "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
  },

  {
    name: "city",
    label: "city",
    type: "text",
    //   placeholder: "Enter your Company name",
    fieldClass:
      "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
    labelClass:
      "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
  },

  {
    name: "Zip code ",
    label: "Zip code",
    type: "email",
    //   placeholder: "Enter your Street address",
    fieldClass:
      "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
    labelClass:
      "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
  },
  {
    name: "phone",
    label: "Mobile",
    type: "number",
    //   placeholder: "Enter your phone Town / City",
    fieldClass:
      "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
    labelClass:
      "  text-gray-700 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-500",
  },
];
