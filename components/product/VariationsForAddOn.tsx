import React, { useEffect } from "react";
import Variations from "./Variation";
import toast from "react-hot-toast";

const VariationsForAddOn: React.FC<any> = ({
  isOpen,
  setIsOpen,
  setErrors,
  errors,
  setVariation,
  variation,
  variationData,
  handleCheckboxChange,
  currentData,
}) => {
  function findMissingRequiredVariations() {
    const variationIds = new Set(variation.map((v:any) => (v as any).id));

    return variationData
      .filter(
        (v:any) => (v as any).is_required === 1 && !variationIds.has((v as any).id)
      )
      .reduce((acc:any, v:any) => {
        acc[(v as any).id] = (v as any).name + " is required";
        return acc;
      }, {} as Record<string, string>);
  }

  const AddAddOn = () => {
    const error = findMissingRequiredVariations();
    if (error && Object.keys(error).length > 0) {
      setErrors(error);
      toast.error("Please select required variations");
      return;
    } else {
      handleCheckboxChange(currentData);
      setIsOpen(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ×
            </button>
            <div>
              <Variations
                errors={errors}
                setVariation={setVariation}
                variation={variation}
                variationData={variationData}
              />

              <button
                onClick={AddAddOn}
                className="bg-black text-white px-3 rounded-sm mx-auto  py-2"
              >
                add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariationsForAddOn;
