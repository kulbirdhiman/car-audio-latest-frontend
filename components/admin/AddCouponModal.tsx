"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import DynamicForm, { FormField } from "@/components/globals/DynamicForm";
import { getCategories, detailCategory } from "@/store/actions/admin/category";
import { getDepartment } from "@/store/actions/admin/department";
import { getProduct } from "@/store/actions/admin/product";
import CustomMultiSelect from "@/components/globals/Fields/CustomMultiSelect";

// Define Coupon type
interface Coupon {
  code: string;
  discountAbove500: number;
  discountBelow500: number;
  excludeDiscountedProducts: boolean;
  isActive: boolean;
  category: string;
  model: string;
  specificModels: number[];
  specificProduct: string;
  validFrom_date: string;
  validFrom_time: string;
  validTo_date: string;
  validTo_time: string;
}

interface AddCouponModalProps {
  onClose: () => void;
  // onAddCoupon: (coupon: Coupon) => void;
}

const AddCouponModal: React.FC<AddCouponModalProps> = ({
  onClose,
  // onAddCoupon,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [coupon, setCoupon] = useState<Coupon>({
    code: "",
    discountAbove500: 10,
    discountBelow500: 5,
    excludeDiscountedProducts: true,
    isActive: true,
    category: "",
    model: "",
    specificModels: [],
    specificProduct: "",
    validFrom_date: "",
    validFrom_time: "00:00",
    validTo_date: "",
    validTo_time: "23:59",
  });

  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchDepartments();
    fetchCategories();
    fetchModels()
 // Fetch categories immediately when the modal opens
  }, []);

  const fetchDepartments = async () => {
    try {
      const deptRes = await dispatch(getDepartment({})).unwrap();
      if (deptRes.success) {
        setDepartments(
          deptRes.data.result.map((dept: any) => ({
            value: dept.id,
            label: dept.name,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await dispatch(getCategories({})).unwrap();
      if (res.success) {
        setCategories(
          res.data.result.map((cat: any) => ({
            value: cat.id,
            label: cat.name,
            slug: cat.slug,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchModels = async () => {
    try {
    //   const res = await dispatch(detailCategory({ category_id: categoryId })).unwrap();
      const res1 = await dispatch(getProduct({})).unwrap();
        console.log(res1.data.result)
      if (res1.success) {
        setModels(
          (res1.data.result as any).map((model: any) => ({
            value: model.id,
            label: model.name,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch models", error);
    }
  };

  const handleCategoryChange = (selected: any) => {
    setCoupon({
      ...coupon,
      category: selected.value,
      model: "",
      specificModels: [],
    });
    setModels([]);
    fetchModels();
  };

  const formFields: FormField[] = [
    {
      name: "code",
      label: "Coupon Code",
      type: "text",
      divClass: "w-full",
      fieldClass: "w-full p-2 border",
    },
    {
      name: "discountAbove500",
      label: "above $500)",
      type: "number",
      divClass: "w-full",
      fieldClass: "w-full p-2 border",
    },
    {
      name: "discountBelow500",
      label: " less than $500)",
      type: "number",
      divClass: "w-full",
      fieldClass: "w-full p-2 border",
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      divClass: "w-full",
      fieldClass: "w-1/2 p-2 border",
      options: departments,
    },
    {
      name: "category",
      label: "Category ",
      type: "select",
      divClass: "w-1/2 block",
      fieldClass: "w-full p-2 border",
      options: categories,
      customChange: handleCategoryChange,
    },
    {
      name: "specificModels",
      label: "Specific Models (Optional)",
      type: "custom",
      divClass: "w-full",
      fieldClass: "w-full p-2 border",
      customRender: () => (
        <CustomMultiSelect
          name="specificModels"
          label="Specific Product (Optional)"
          options={models.map((model) => ({
            id: model.value,
            label: model.label,
          }))}
          selected={coupon.specificModels}
          onSelectionChange={(selectedIds:any) =>
            setCoupon({ ...coupon, specificModels: selectedIds })
          }
          onSearchChange={() => {}}
          errors={errors}
        />
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent, values: Coupon) => {
    e.preventDefault();

    if (!values.code) {
      setErrors({ code: "Coupon code is required." });
      return;
    }

    setErrors({});
    // onAddCoupon(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex">
      <div className="flex-1 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="w-96 bg-white h-full shadow-lg overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">Create New Coupon</h2>
        <DynamicForm
          formClassName="w-full  flex-wrap gap-2 text-xs"
          submitTitle="Add Coupon"
          values={coupon}
          setValues={setCoupon}
          errors={errors}
          formFields={formFields}
          handleSubmit={handleSubmit}
          mode="add"
        />
      </div>
    </div>
  );
};

export default AddCouponModal;
