"use client";

import React, { useEffect } from "react";
import { FormField } from "../DynamicForm";
import RichTextEditor from "./TextEditor";

interface RichTextInputProps {
  field: FormField;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  field,
  values,
  setFieldValue,
  errors,
}) => {


  return (
    <div className="col-span-2" >
      <label className="block text-lg font-medium mb-1">{field.label}</label>
      <RichTextEditor
        value={values[field.name] || ""}
        onChange={(content:any) => setFieldValue(field.name, content)}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default RichTextInput;
