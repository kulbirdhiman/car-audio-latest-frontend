"use client";
import React, { useState } from "react";
import DynamicForm, { FormField } from "../globals/DynamicForm";
import {
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { mapServerErrors } from "@/helpers/commonFunction";
import { addAddress, editAddress } from "@/store/actions/user/address";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

// Define types for the props
interface AddAddressFormProps {
  getMyAddress: () => void;
  billingAddress: Record<string, any>;
  setBillingAddress: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  billingErrors: Record<string, string>;
  setBillingErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({
  getMyAddress,
  billingAddress,
  setBillingAddress,
  billingErrors,
  setBillingErrors,
  isOpen,
  setIsOpen,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();
    console.log("Form Submitted", values, mode);

    try {
      const api = values.id
        ? editAddress(values as any)
        : addAddress(values as any);
      const res = await dispatch(api).unwrap();

      console.log("Submitted values:", res);

      if (res.success) {
        getMyAddress();
        setIsOpen(!isOpen);
        // toggleDrawer({});
      }
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors(
        (error as any).errors,
        setBillingErrors
      );
      console.error("Login failed:", formErrors);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-lg p-2 relative">
          <button
            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            ×
          </button>
          <div className="p-5">
            <h1 className="text-xl my-4 font-semibold"> Billing Address</h1>
            <DynamicForm
              formClassName="grid grid-cols-2 gap-4 item-center"
              submitTitle="submit"
              values={billingAddress}
              setValues={setBillingAddress}
              errors={billingErrors}
              formFields={formFields(
                countries,
                billingAddress,
                setBillingAddress,
                billingErrors
              )}
              handleSubmit={handleSubmit}
              mode="add"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default AddAddressForm;

// Define types for form fields
const formFields = (
  countries: { name: string; isoCode: string }[],
  billingAddress: Record<string, any>,
  setBillingAddress: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  billingErrors: Record<string, string>
): FormField[] => {
  return [
    {
      name: "name",
      label: "First Name",
      type: "text",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter First name",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter First name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter Email name",
    },
    {
      name: "phone",
      label: "Phone",
      type: "number",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter phone number",
    },
    {
      name: "country",
      label: "Country",
      type: "custom",
      // options: countries,
      customRender: () => {
        return (
          <div className="border-none">
            <label className="block text-lg font-medium">
              Select Countries
            </label>
            <CountrySelect
              inputClassName="w-full bg-transparent text-gray-900 border-none focus:outline-none"
              defaultValue={billingAddress.country}
              onChange={(e: any) => {
                console.log(e);
                setBillingAddress({
                  ...billingAddress,
                  country: {
                    id: e.id,
                    name: e.name,
                    iso3: e.iso3,
                    iso2: e.iso2,
                  },
                  country_name: e.name,
                });
              }}
              placeHolder="Select Country"
            />
            {billingErrors.country && (
              <p className="text-red-400 ">{billingErrors.country}</p>
            )}
          </div>
        );
      },
    },
    {
      name: "state",
      label: "State",
      type: "custom",
      customRender: () => {
        return (
          <div className="c">
            <label className="block text-lg font-medium">States</label>
            <StateSelect
              countryid={(billingAddress.country as any)?.id}
              defaultValue={billingAddress.state}
              className="peer w-full border-b border-gray-900 focus:outline-none focus:border-black"
              onChange={(e: any) => {
                console.log(e);
                setBillingAddress({
                  ...billingAddress,
                  state: { id: e.id, name: e.name, state_code: e.state_code },
                  state_name: e.name,
                });
              }}
              placeHolder="Select Country"
            />
            {billingErrors.state && (
              <p className="text-red-400 ">{billingErrors.state}</p>
            )}
          </div>
        );
      },
    },
    {
      name: "city",
      label: "Town / City",
      type: "text",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter city",
    },
    {
      name: "street_address",
      label: "Street Address",
      type: "text",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter street_address",
    },
    {
      name: "postcode",
      label: "Postcode / ZIP",
      type: "text",
      fieldClass:
        "peer w-full rounded border border-gray-400 p-2 focus:outline-none focus:border-black",
      labelClass: "text-gray-700",
      placeholder: "Enter Post code",
    },
  ];
};
