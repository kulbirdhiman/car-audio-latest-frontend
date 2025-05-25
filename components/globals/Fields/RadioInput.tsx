"use client";

import { FormField } from "../DynamicForm";

interface RadioInputProps {
  field: FormField;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const RadioInput: React.FC<RadioInputProps> = ({
  field,
  values,
  setFieldValue,
  errors,
}) => {
  return (
    <div>
      <label className="text-lg font-medium">{field.label}</label>
      <div className="" >
        {field.options?.map((option, index) => (
          <label key={index} className="inline-flex items-center ms-2 mt-2">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-primary-600"
              name={field.name}
              value={option.value}
              checked={values[field.name] === option.value}
              onChange={() => setFieldValue(field.name, option.value)}
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {errors[field.name] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default RadioInput;
