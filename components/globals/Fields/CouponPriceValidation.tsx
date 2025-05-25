import { useEffect } from "react";

type CustomField = {
  id: number;
  //   in_stock: number;
  price_up_to: number;
  discount: number;
};

type DynamicFieldsProps = {
  name: string;
  label?: string;
  fields: CustomField[];
  onChange?: (fields: CustomField[], name: string) => void;
  errors?: any;
};

const CouponPriceValidation: React.FC<DynamicFieldsProps> = ({
  name,
  label,
  fields,
  onChange,
  errors,
}) => {
  useEffect(() => {
    if (fields?.length === 0) {
      onChange?.([{ id: Date.now(), price_up_to: 0, discount: 0 }], name);
    }
  }, [fields, name, onChange]);

  const handleAddField = () => {
    const newFields = [
      ...fields,
      { id: Date.now(), price_up_to: 0, discount: 0 },
    ];
    onChange?.(newFields, name);
  };

  const handleChange = (id: number, key: keyof CustomField, value: any) => {
    const updatedFields = fields.map((field) =>
      field.id === id
        ? {
            ...field,
            [key]: key === "discount" ? parseFloat(value) || 0 : value,
          }
        : field
    );
    onChange?.(updatedFields, name);
  };

  const handleRemoveField = (id: number) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    onChange?.(updatedFields, name);
  };

  return (
    <div>
      {label && <label className="text-lg font-bold">{label}</label>}
      {errors?.[name] && (
        <p className="text-red-500 text-left mt-1">{errors[name]}</p>
      )}

      <div className="space-y-3 mt-2">
        {fields?.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-4 border p-3 rounded-md shadow-sm min-h-[110px]"
          >
            {/* Name Input */}
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium">Price Up to</label>
              <input
                type="text"
                placeholder="Enter name"
                value={field.price_up_to}
                onChange={(e) =>
                  handleChange(field.id, "price_up_to", e.target.value)
                }
                className="p-2 border rounded-md w-full"
              />
              <p className="text-red-500 text-sm min-h-[20px]">
                {errors?.[`${name}[${index}].price_up_to`] || ""}
              </p>
            </div>

            {/* Price Input */}
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium">Discount</label>
              <input
                type="number"
                placeholder="Enter price"
                value={field.discount}
                onChange={(e) =>
                  handleChange(field.id, "discount", e.target.value)
                }
                className="p-2 border rounded-md w-full min-w-[120px]"
              />
              <p className="text-red-500 text-sm min-h-[20px]">
                {errors?.[`${name}[${index}].discount`] || ""}
              </p>
            </div>

            {/* Add / Remove Button */}
            <div className="flex items-center mt-6">
              {index === 0 ? (
                <button
                  type="button"
                  onClick={handleAddField}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-lg"
                >
                  +
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemoveField(field.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-lg"
                >
                  -
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponPriceValidation;
