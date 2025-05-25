"use client";

import React, { useEffect, useState } from "react";
import DynamicForm, { FormField } from "../globals/DynamicForm";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface BillingFormProps {
  billingAddress: any;
  setBillingAddress: (address: any) => void;
  billingErrors: { [key: string]: string };
  setBillingErrors: (errors: { [key: string]: string }) => void;
}

const BillingForm: React.FC<BillingFormProps> = ({
  billingAddress,
  setBillingAddress,
  billingErrors,
  setBillingErrors,
}) => {
  const [country, setCountry] = useState<any>(null);

  const handleSubmit = () => {
    console.log("Submitted Values:", billingAddress);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl my-4 font-semibold">Billing Address</h1>
      <DynamicForm
        formClassName="grid grid-cols-2 gap-4 item-center"
        values={billingAddress}
        setValues={setBillingAddress}
        errors={billingErrors}
        formFields={formFields({
          country,
          setCountry,
          billingAddress,
          setBillingAddress,
          billingErrors,
        })}
        handleSubmit={handleSubmit}
        mode="add"
      />
    </div>
  );
};

export default BillingForm;

// FormFields generator function
interface FormFieldsParams {
  country: any;
  setCountry: (country: any) => void;
  billingAddress: any;
  setBillingAddress: (address: any) => void;
  billingErrors: { [key: string]: string };
}

const formFields = ({
  country,
  setCountry,
  billingAddress,
  setBillingAddress,
  billingErrors,
}: FormFieldsParams): FormField[] => {
  return [
    {
      name: "name",
      label: "First Name",
      type: "text",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter Last Name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter Email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "number",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter Phone Number",
    },
    {
      name: "country",
      label: "Country",
      type: "custom",
      customRender: () => (
        <div className="border-none">
          <label className="block text-lg font-medium">Select Country</label>
          <CountrySelect
            inputClassName="w-full bg-transparent text-gray-900 border-none focus:outline-none"
            onChange={(e: any) => {
              setBillingAddress({
                ...billingAddress,
                country: { id: e.id, name: e.name, iso3: e.iso3, iso2: e.iso2 },
                country_name: e.name,
              });
              setCountry(e);
            }}
            placeHolder="Select Country"
          />
          {billingErrors.country && (
            <p className="text-red-400">{billingErrors.country}</p>
          )}
        </div>
      ),
    },
    {
      name: "state",
      label: "State",
      type: "custom",
      customRender: () => (
        <div>
          <label className="block text-lg font-medium">Select State</label>
          <StateSelect
            countryid={country?.id}
            className="peer w-full border-b border-gray-900 focus:outline-none focus:border-green-500"
            onChange={(e: any) => {
              setBillingAddress({
                ...billingAddress,
                state: { id: e.id, name: e.name, state_code: e.state_code },
                state_name: e.name,
              });
            }}
            placeHolder="Select State"
          />
          {billingErrors.state && (
            <p className="text-red-400">{billingErrors.state}</p>
          )}
        </div>
      ),
    },
    {
      name: "city",
      label: "Town / City",
      type: "text",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter City",
    },
    {
      name: "street_address",
      label: "Street Address",
      type: "text",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter Street Address",
    },
    {
      name: "postcode",
      label: "Postcode / ZIP",
      type: "text",
      fieldClass: "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-green-500",
      labelClass: "text-gray-700",
      placeholder: "Enter Postcode",
    },
  ];
};
