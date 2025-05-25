"use client";

import { FormField } from "../DynamicForm";

interface CheckboxInputProps {
  field: FormField;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  field,
  values,
  setFieldValue,
  errors,
}) => {
  const handleCheckboxChange = (optionValue: string) => {
    const currentValues = values[field.name] || [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((value: string) => value !== optionValue)
      : [...currentValues, optionValue];
    setFieldValue(field.name, newValues);
  };

  return (
    <div>
      <label className="text-lg font-medium">{field.label}</label>
      <div>
        {field.options?.map((option, index) => (
          <label key={index} className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary-600"
              checked={values[field.name]?.includes(option.value) || false}
              onChange={() => handleCheckboxChange(option.value)}
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

export default CheckboxInput;
