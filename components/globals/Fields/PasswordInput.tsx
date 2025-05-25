"use client";

import { useState } from "react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { FormField } from "../DynamicForm";

interface PasswordInputProps {
  field: FormField;
  value: string;
  setValue: (name: string, value: string) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  field,
  value,
  setValue,
  error,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  return (
    <div className={`${field.divClass ? field.divClass : "items-center"}`}>
      <label
        className={`${
          field.labelClass ? field.labelClass : "block text-lg font-medium"
        } `}
      >
        {field.label}
      </label>
      <div className="flex items-center relative ">
        <input
          type={passwordVisibility ? "text" : "password"}
          className={`${
            field.fieldClass
              ? field.fieldClass
              : "peer relative block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white text-black rounded-lg text-md sm:text-lg font-medium h-11 px-4 py-3 mt-1"
          } `}
          // className="peer relative block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-md sm:text-lg font-medium h-11 px-4 py-3 mt-1"
          value={value}
          onPaste={(e) => e.preventDefault()}
          onChange={(e) => setValue(field.name, e.target.value)}
        />
        <button
          type="button"
          onClick={() => setPasswordVisibility((prev) => !prev)}
          className="absolute right-2 cursor-pointer transition-all duration-200 ease-in-out focus:outline-none"
        >
          {passwordVisibility ? (
             <FaEye className="w-6 h-6 text-black dark:text-black" />
            ) : (
            <FaEyeSlash className="w-6 h-6   text-black dark:text-black" />
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-left mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
