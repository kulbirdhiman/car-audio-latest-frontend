"use client";
import React, { useEffect, useMemo, useState } from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { checkVariations } from "@/store/actions/admin/variation";
import VariationsForAddOn from "./VariationsForAddOn";
import { IN_STOCK } from "@/app/constants";

interface ImageType {
  image: string;
}

interface ExtraProduct {
  id: number;
  name: string;
  discount_price?: number;
  regular_price?: number;
  in_stock: number;
  images: ImageType[];
  department_id: number;
  category_id: number;
}

interface VariationType {
  id: number;
  [key: string]: any;
}

interface AddOnProps {
  extras: ExtraProduct[];
  setAddOns: React.Dispatch<React.SetStateAction<any[]>>;
  addOns: any[];
}

const AddOn: React.FC<AddOnProps> = ({ extras = [], setAddOns, addOns }) => {
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [variationData, setVariationData] = useState<VariationType[]>([]);
  const [variation, setVariation] = useState<VariationType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Partial<ExtraProduct>>({});

  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = async (data: ExtraProduct) => {
    setCurrentData(data);

    if (!addOns.some((r) => r.id === data.id)) {
      const checkData = await checkVariationData(data);
      if (checkData && checkData.length > 0) return;
    }

    setAddOns((prev) => {
      if (prev.some((r) => r.id === data.id)) {
        return prev.filter((item) => item.id !== data.id);
      } else {
        return [
          ...prev,
          {
            ...data,
            quantity: 1,
            variations: variation,
            product_id: data.id,
          },
        ];
      }
    });
    setVariation([]);
  };

  const checkVariationData = async (data: ExtraProduct) => {
    const variations = await dispatch(
      checkVariations({
        product_id: data.id,
        department_id: data.department_id,
        category_id: data.category_id,
        variation_ids: variation.map((v) => v.id),
      })
    );

    const variationList = (variations.payload as any).data.variation;

    if (variationList.length > 0) {
      setVariationData(variationList);
      setIsOpen(true);
      return variationList;
    }
  };

  return (
    <>
      <div className="dark:text-black p-2">
        <h1 className="font-medium font-sans text-xl mb-4">Add Ons</h1>

        {/* Variation Popup */}
        <VariationsForAddOn
          setErrors={setErrors}
          currentData={currentData}
          handleCheckboxChange={handleCheckboxChange}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          errors={errors}
          setVariation={setVariation}
          variation={variation}
          variationData={variationData}
        />

        {/* Dropdown */}
        <div className="w-full  mx-auto">
          <select
            className="w-full border border-gray-300 rounded-lg p-2 text-black"
            onChange={(e) => {
              const selectedId = parseInt(e.target.value);
              const selectedProduct = extras.find((p) => p.id === selectedId);
              if (selectedProduct) {
                handleCheckboxChange(selectedProduct);
              }
            }}
            value={addOns.length > 0 ? addOns[0].id : ""}
          >
            <option value="">Select an Add On</option>
            {extras.map((product) => (
              <option
                key={product.id}
                value={product.id}
                disabled={product.in_stock !== IN_STOCK}
              >
                {product.name}
                {product.in_stock !== IN_STOCK ? " (Out of Stock)" : ""}
                {" - $"}
                {product.discount_price && product.discount_price > 0
                  ? product.discount_price
                  : product.regular_price}
                {(product?.discount_price ?? 0) > 0
                  ? ` (was $${product.regular_price})`
                  : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default AddOn;
