"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DynamicForm from "./DynamicForm";

type FormDrawerProps<T extends Record<string, any>> = {
  title: string;
  open: boolean;
  toggleDrawer: (arg?: any) => void;
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  errors?: Record<string, string>;
  formFields: any[];
  handleSubmit: (e: React.FormEvent, values: T, mode: string) => void;
  submitTitle: string;
  toggleData?: Record<string, any>;
  customClass?: string;
  formClassName?:string;
};

export default function RightDrawerForm<T extends Record<string, any>>({
  title,
  open,
  toggleDrawer,
  toggleData = {},
  values,
  setValues,
  errors = {},
  formFields,
  handleSubmit,
  submitTitle,
  customClass,
  formClassName
}: FormDrawerProps<T>) {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 bg- backdrop-blur-xs bg-opacity-50 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => toggleDrawer(toggleData)}
    >
      <div
        className={`${
          customClass
            ? customClass
            : "bg-white w-full max-w-md h-full shadow-lg   transform transition-transform duration-300"
        }   `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={() => toggleDrawer(toggleData)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 pb-[80px] border-l overflow-y-auto scrollbar-width h-full">
          <DynamicForm
            values={values}
            setValues={setValues}
            errors={errors}
            formFields={formFields}
            handleSubmit={handleSubmit}
            submitTitle={submitTitle}
            formClassName={formClassName}
          />
        </div>
      </div>
    </div>
  );
}
