"use client";
import React from "react";

interface FormField {
    name: string;
    label: string;
    divClass?: string;
    labelClass?: string;
    fieldClass?: string;
}

interface FormDateTimePickerProps {
    field: FormField;
    values: Record<string, any>;
    setFieldValue: (field: string, value: any) => void;
    errors?: Record<string, string>;
}

const FormDateTimePicker: React.FC<FormDateTimePickerProps> = ({
    field,
    values,
    setFieldValue,
    errors
}) => {
    const fieldValue = values[field.name] || { date: "", time: "" };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field.name, { ...fieldValue, date: e.target.value });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field.name, { ...fieldValue, time: e.target.value });
    };

    return (
        <div className={`flex flex-col ${field.divClass || "w-full mb-4"}`}>
            <label className={field.labelClass || "block text-sm font-medium text-gray-700"}>
                {field.label}
            </label>
            <div className="flex space-x-2">
                <input
                    type="date"
                    value={fieldValue.date}
                    onChange={handleDateChange}
                    className={field.fieldClass || "border p-2 flex-1"}
                />
                <input
                    type="time"
                    value={fieldValue.time}
                    onChange={handleTimeChange}
                    className={field.fieldClass || "border p-2 flex-1"}
                />
            </div>
            {errors && errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
        </div>
    );
};

export default FormDateTimePicker;
