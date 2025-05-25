import { useEffect } from "react";

type CustomField = {
  id: number;
  in_stock: number;
  name: string;
  price: number;
};

type DynamicFieldsProps = {
  name: string;
  label?: string;
  fields: CustomField[];
  onChange?: (fields: CustomField[], name: string) => void;
  errors?: any;
};

const VariationField: React.FC<DynamicFieldsProps> = ({
  name,
  label,
  fields,
  onChange,
  errors,
}) => {
  useEffect(() => {
    if (fields.length === 0) {
      onChange?.([{ id: Date.now(), in_stock: 1, name: "", price: 0 }], name);
    }
  }, [fields, name, onChange]);

  const handleAddField = () => {
    const newFields = [
      ...fields,
      { id: Date.now(), in_stock: 1, name: "", price: 0 },
    ];
    onChange?.(newFields, name);
  };

  const handleChange = (id: number, key: keyof CustomField, value: any) => {
    const updatedFields = fields.map((field) =>
      field.id === id
        ? { ...field, [key]: key === "price" ? parseFloat(value) || 0 : value }
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
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-4 border p-3 rounded-md shadow-sm min-h-[110px]"
          >
            {/* In Stock Checkbox */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium">In Stock</label>
              <input
                type="checkbox"
                className="mt-1"
                checked={field.in_stock === 1}
                onChange={(e) =>
                  handleChange(field.id, "in_stock", e.target.checked ? 1 : 0)
                }
              />
            </div>

            {/* Name Input */}
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={field.name}
                onChange={(e) => handleChange(field.id, "name", e.target.value)}
                className="p-2 border rounded-md w-full"
              />
              <p className="text-red-500 text-sm min-h-[20px]">
                {errors?.[`${name}[${index}].name`] || ""}
              </p>
            </div>

            {/* Price Input */}
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={field.price}
                onChange={(e) =>
                  handleChange(field.id, "price", e.target.value)
                }
                className="p-2 border rounded-md w-full min-w-[120px]"
              />
              <p className="text-red-500 text-sm min-h-[20px]">
                {errors?.[`${name}[${index}].price`] || ""}
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

export default VariationField;
