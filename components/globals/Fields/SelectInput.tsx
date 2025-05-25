"use client";
import dynamic from "next/dynamic";
import { FormField } from "../DynamicForm";
const Select = dynamic(() => import("react-select"), { ssr: false });

interface SelectInputProps {
  field: FormField;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  field,
  values,
  setFieldValue,
  errors,
}) => {
  const selectedValue = field.isMultiple
    ? field.options?.filter((option) =>
        values[field.name]?.includes(option.value)
      )
    : field.options?.find((option) => option.value === values[field.name]) ||
      null;

  return (
    <div >
      <label className="block text-lg font-medium mb-1">{field.label}</label>
      <Select
        isMulti={field.isMultiple}
        options={field.options || []}
        value={selectedValue}
        onChange={(selectedOptions) => {
          if (field.customChange) {
            field.customChange(selectedOptions);
          }

          const newValue = field.isMultiple
            ? (selectedOptions as { value: string | number }[]).map(
                (option) => option.value
              )
            : (selectedOptions as { value: string | number })?.value;

          setFieldValue(field.name, newValue);
        }}
        isSearchable
        placeholder={field.placeholder}
        className="block w-full"
      />
      {errors[field.name] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default SelectInput;
