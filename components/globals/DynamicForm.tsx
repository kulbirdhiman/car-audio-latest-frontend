"use client";

import React from "react";
import PasswordInput from "./Fields/PasswordInput";
import SelectInput from "./Fields/SelectInput";
import CheckboxInput from "./Fields/CheckboxInput";
import TextareaInput from "./Fields/TextareaInput";
import RadioInput from "./Fields/RadioInput";
import RichTextInput from "./Fields/RichTextInput"; // Import RichTextInput

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "checkbox"
    | "select"
    | "custom"
    | "email"
    | "password"
    | "textarea"
    |   "url"
    | "radio"
    | "richtext"; // Added richtext support
  placeholder?: string;
  options?: { value: string; label: string }[];
  isMultiple?: boolean;
  is_parent?: boolean;
  parent_field?: string;
  child_field?: string;
  fieldClass?: string;
  divClass?: string;
  labelClass?: string;
  customRender?: (
    field: FormField,
    values: Record<string, any>,
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>,
    errors: Record<string, string>
  ) => React.ReactNode;
  customChange?: (...args: any[]) => void;
  otherFunction?: (arg?: unknown) => void;
  customClass?: string;
  is_condition?:boolean;
  condition? : boolean

}

interface DynamicFormProps<T extends Record<string, any>> {
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  errors: Record<string, string>;
  formFields: FormField[];
  handleSubmit: (e: React.FormEvent, values: T, mode: string) => void;
  mode?: "add" | "edit";
  submitTitle?: string;
  formClassName?: string;
  submitClass?: string;
  submitBtnClass?: string;
}

const DynamicForm = <T extends Record<string, any>>({
  values,
  setValues,
  errors,
  formFields = [],
  handleSubmit,
  mode = "add",
  formClassName,
  submitTitle,
  submitClass,
  submitBtnClass
}: DynamicFormProps<T>) => {
  const updateField = (name: string, value: string | number | boolean) => {
    setValues((prev: T) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form
        className={formClassName || "mt-6 space-y-6"}
        onSubmit={(e) => handleSubmit(e, values, mode)}
      >
        {formFields.map((field, index) => {
          if (field.type === "custom" && field.customRender) {
            return (
              <div
                key={index}
                className={field.customClass ? field.customClass : ""}
              >
                {field.customRender(
                  field,
                  values,
                  setValues as React.Dispatch<
                    React.SetStateAction<Record<string, any>>
                  >,
                  errors
                )}
              </div>
            );
          }

          if (["text", "number", "email","date","url"].includes(field.type) &&  ( !field?.is_condition || field.condition ) ) {

            return (
              <div
                className={`${field.divClass ? field.divClass : ""}`}
                key={index}
              >
                <label
                  className={`${
                    field.labelClass
                      ? field.labelClass
                      : "block text-lg font-medium"
                  } `}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className={`${
                    field.fieldClass
                      ? field.fieldClass
                      : "mt-1 block w-full border rounded-lg py-2 px-3 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  } `}
                  placeholder={field.placeholder}
                  value={values[field.name] || ""}
                  onChange={(e) => updateField(field.name, e.target.value)}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            );
          }

          if (field.type === "textarea") {
            return (
              <TextareaInput
                key={index}
                field={field}
                values={values}
                setFieldValue={updateField}
                errors={errors}
              />
            );
          }

          if (field.type === "richtext") {
            return (
              <RichTextInput
                key={index}
                field={field}
                values={values}
                setFieldValue={updateField}
                errors={errors}
              />
            );
          }

          if (field.type === "password") {
            return (
              <PasswordInput
                key={index}
                field={field}
                value={values[field.name] || ""}
                setValue={updateField}
                error={errors[field.name]}
              />
            );
          }

          if (field.type === "checkbox") {
            return (
            //  <div  className={`${field.divClass ? field.divClass : ""}`}>
               <CheckboxInput
                key={index}
                field={field}
                values={values}
                setFieldValue={updateField}
                errors={errors}
              />
            //  </div>
            );
          }

          if (field.type === "radio" &&  ( !field?.is_condition || field.condition )) {
            return (
              <RadioInput
                key={index}
                field={field}
                values={values}
                setFieldValue={updateField}
                errors={errors}
              />
            );
          }

          if (
            field.type === "select" &&
            (!field.parent_field || values[field.parent_field!]) &&   ( !field?.is_condition || field.condition )
          ) {
            return (
              <SelectInput
                key={index}
                field={field}
                values={values}
                setFieldValue={updateField}
                errors={errors}
              />
            );
          }

          return null;
        })}

        {submitTitle && (
          <div className={submitClass? submitClass :"mt-6"}>
            <button
              type="submit"
              className={submitBtnClass?submitBtnClass:"w-full hover:bg-[rgb(249,188,96)] hover:text-black rounded-md px-4 py-2 text-base font-medium shadow-sm bg-black text-white"}
            >
              {submitTitle}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DynamicForm;
