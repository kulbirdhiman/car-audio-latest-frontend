import { IN_STOCK, IS_MULTY, OPTION_TYPE } from "@/app/constants";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Variations = ({ variationData, setVariation, variation, errors }:{ variationData:any, setVariation:any, variation:any, errors:any }) => {
  const [showCategory, setShowCategory] = useState<any>({});
  const [customType,setCustomType] = useState<any>("")

  const toggleCategoryVisibility = (category:any) => {
    setShowCategory((prevState:any) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleOptionChange = (row: any, option: any) => {
  if (option.in_stock !== IN_STOCK) return;

  setVariation((prev: any) => {
    let updatedVariations = [...prev];

    if (row.is_multy == IS_MULTY) {
      const existingVariation = updatedVariations.find((v) => v.id == row.id);

      if (existingVariation) {
        const isOptionSelected = existingVariation.options.some(
          (o: any) => o.id === option.id
        );

        // Create new options array (immutably)
        const newOptions = isOptionSelected
          ? existingVariation.options.filter((o: any) => o.id !== option.id)
          : [...existingVariation.options, option];

        // Filter out the old variation
        updatedVariations = updatedVariations.filter((v) => v.id !== row.id);

        if (newOptions.length > 0) {
          updatedVariations.push({
            ...row,
            options: newOptions,
          });
        }
      } else {
        updatedVariations.push({
          ...row,
          options: [option],
        });
      }
    } else {
      updatedVariations = updatedVariations.filter((v) => v.id !== row.id);

      updatedVariations.push({
        ...row,
        options: [option],
      });
    }

    return updatedVariations;
  });
};


  const handleOptionChangeForCustom = (row:any, option:any) => {


    setVariation((prev:any) => {
      let updatedVariations = [...prev];

     
        const existingVar = updatedVariations.find((v) => v.id == row.id);
        updatedVariations = updatedVariations.filter((v) => v.id != row.id);

        if(option.name){
          if (existingVar?.options[0]?.id == option.id) {
          
            updatedVariations.push({
              ...row,
              options: [option],
            });
          } else {
            updatedVariations.push({
              ...row,
              options: [option],
            });
          }
        }
      
  

      return updatedVariations;
    });

  }
  useEffect(()=>{
console.log(variation,"variation");

  },[variation])
  return (
    <div>
      <p className="text-lg text-black font-medium font-sa">Select your Options</p>
      <div className="mt-4   space-y-4">
        {variationData?.map((row:any) =>
          row.type_of_option != OPTION_TYPE.custom ? (
            <div key={row.id}>
              {errors[row.id] && (
                <p className="px-3 text-red-400">{errors[row.id]}</p>
              )}
              <button
                onClick={() => toggleCategoryVisibility(row.name)}
                className="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
              >
                <span>
                  {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                </span>
                {showCategory[row.name] ? (
                  <ChevronUpIcon className="h-5 w-5 text-black transition-transform duration-300" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-black transition-transform duration-300" />
                )}
              </button>
              {showCategory[row.name] && (
                <div className="mt-2 space-y-2">
                  {row.options.map((option:any) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        name={row.name}
                        type={
                          row.is_multy == IS_MULTY ? "checkbox" : "checkbox"
                        }
                        disabled={option.in_stock !== IN_STOCK} // Disable out-of-stock options
                        checked={
                          variation
                            .find((r:any) => r.id === row.id)
                            ?.options?.some((op:any) => op.id === option.id) ||
                          false
                        }
                        id={`option-${option.id}`}
                        onChange={() =>  handleOptionChange(row, option)}
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor={`option-${option.id}`}
                        className="text-sm text-gray-600"
                      >
                        {option.name}{" "}
                        {option.price > 0 && `(+$${option.price})`}{" "}
                        {option.in_stock != IN_STOCK && "Out of stock"}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div key={row.id}>
                {errors[row.id] && (
                  <p className="px-3 text-red-400">{errors[row.id]}</p>
                )}
                <button
                  onClick={() => toggleCategoryVisibility(row.name)}
                  className="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                >
                  <span>
                    {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                  </span>
                  {showCategory[row.name] ? (
                    <ChevronUpIcon className="h-5 w-5 text-black transition-transform duration-300" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-black transition-transform duration-300" />
                  )}
                </button>
                {showCategory[row.name] && (
                  <div className="mt-2 space-y-2">
                    {row.options.map((option:any) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <input
                          type={"text"}
                          placeholder={row.name}
                          id={`option-${option.id}`}
                          value={
                            variation.find((r:any) => r.id === row.id)?.options[0]
                              ?.name
                          }
                          onChange={(e) => {
                            setCustomType(e.target.value)
                            handleOptionChangeForCustom(row, {
                              ...option,
                              name: e.target.value,
                            });
                          }}
                          className="   border-black border-2 px-2 py-1   rounded text-black "
                        />
                        <label
                          htmlFor={`option-${option.id}`}
                          className="text-sm text-gray-600"
                        >
                          {option.price > 0 ? `(+$${option.price})` : "add"}{" "}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Variations;
