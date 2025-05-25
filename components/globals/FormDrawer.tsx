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
};

export default function FormDrawer<T extends Record<string, any>>({
  title,
  open,
  toggleDrawer,
  values,
  setValues,
  errors = {},
  formFields,
  handleSubmit,
  submitTitle,
}: FormDrawerProps<T>) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg max-h-[90vh] overflow-y-auto scrollbar-width ">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button className="text-gray-400 hover:text-gray-500" onClick={() => toggleDrawer({})}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 pb-6 overflow-y-auto max-h-[70vh]">
          <DynamicForm
            values={values}
            setValues={setValues}
            errors={errors}
            formFields={formFields}
            handleSubmit={handleSubmit}
            submitTitle={submitTitle}
          />
        </div>
      </div>
    </div>
  );
}
