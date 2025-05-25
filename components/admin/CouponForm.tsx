import React, { useEffect, useState } from "react";
import RightDrawerForm from "../globals/RightDrawerForm";
import UpdateOrderFields from "../globals/Fields/UpdateOrderFields";
import {
  COUPEN_ACTIVATE,
  COUPEN_APPLY_FOR_ALL_TIME,
  COUPEN_APPLY_ON_DISCOUNTED_PRODUCT,
  COUPEN_APPLY_WITH_OTHER_COUPONS,
  COUPEN_CATEGORY_VALIDATION,
  COUPEN_DISCOUNT_TYPE,
  COUPEN_PRICE_VALIDATION,
  COUPEN_TYPE,
  ORDER_STATUS,
} from "@/app/constants";
import { updateOrder } from "@/store/actions/admin/order";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { mapServerErrors } from "@/helpers/commonFunction";
import CouponPriceValidation from "../globals/Fields/CouponPriceValidation";
import { getProduct } from "@/store/actions/admin/product";
import CustomMultiSelect from "../globals/Fields/CustomMultiSelect";
import { getDepartment } from "@/store/actions/admin/department";
import { getCategories } from "@/store/actions/admin/category";
import { addCoupon, editCoupon } from "@/store/actions/admin/coupon";

const CouponForm : React.FC<any>= ({
  setOpen,
  open,
  toggleDrawer,
  setErrors,
  errors,
  setValues,
  values,
}) => {
  const fields = [{ id: Date.now(), price_up_to: 0, discount: 0 }];
  // const [values, setValues] = useState({ options: fields });
  // const [errors, setErrors] = useState({});
  const [freeProductOptions, setFreeProductoptions] = useState<any[]>([]);
  const [productOptions, setProductOptions] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [multiCategoryOptions, setMultiCategoryOptions] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();

    try {
      console.log("values", values);

      const api = values?.id
        ? editCoupon({ ...values })
        : addCoupon({ ...values });
      const res = await dispatch(api).unwrap();
      toggleDrawer();
      // console.log("Mode:", mode);
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
    }
  };

  const handleCustomSelect = (value:any, name:any) => {
    setValues({ ...values, [name]: value });
  };

  const listProducts = async (e:any) => {
    try {
      const data = {};
      const product_ids: any[] = [];
      if (e?.target?.value) {
        const search = e.target.value;
        // if (search && search.length > 0 && totalRecords > limit) {
        //   limit = totalRecords;
        // }
        (data as any).search = search;
        product_ids.push(values[e.target.name]);
      }

      const res = await dispatch(
        getProduct({
          ...data,
          limit: 10000000000,
          product_ids: [...product_ids],
        })
      ).unwrap();

      if (res.success) {
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));
        if (e.target.name == "products") {
          setProductOptions(option);
        }

        if (e.target.name == "free_product") {
          setFreeProductoptions(option);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listDepartments = async () => {
    try {
      const res = await dispatch(getDepartment({})).unwrap();

      if (res.success) {
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));
        setDepartments(option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listMultiCategories = async (e:any) => {
    try {
      const data = {};
      const muti_categories: any[] = [];
      if (e?.target?.value) {
        const search = e.target.value;
        (data as any).search = search;
        muti_categories.push((values as any).categories);
      }

      const res = await dispatch(
        getCategories({
          ...data,
          limit: 10000000,
          category_ids: [...muti_categories],
        })
      ).unwrap();

      if (res.success) {
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));

        setMultiCategoryOptions(option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listDepartments();
  }, []);

  useEffect(() => {
    console.log("values", values);
  }, [values]);

  return (
    <>
      <RightDrawerForm
        title={"Add Coupon discount"}
        open={open}
        toggleDrawer={toggleDrawer}
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={getaddCoupenCodeField(
          values,
          setValues,
          errors,
          handleCustomSelect,
          listProducts,
          freeProductOptions,
          productOptions,
          departments,
          listMultiCategories,
          multiCategoryOptions
        )}
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />
    </>
  );
};

export default CouponForm;

export const getaddCoupenCodeField = (
  values: any,
  setValues: any,
  errors: any,
  handleCustomSelect: any,
  listProducts: any,
  freeProductOptions: any,
  productOptions: any,
  departments: any,
  listMultiCategories: any,
  multiCategoryOptions: any
) => {
  return [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter name...",
    },
    {
      name: "code",
      type: "text",
      label: "Code",
      placeholder: "Enter remarks...",
    },
    {
      name: "coupon_apply_for_all_time",
      type: "radio",
      label: "coupon_apply_for_all_time",
      placeholder: "Enter Name...",
      options: [
        { value: COUPEN_APPLY_FOR_ALL_TIME.YES, label: "Yes" },
        { value: COUPEN_APPLY_FOR_ALL_TIME.NO, label: "No  " },
      ],
    },
    {
      name: "from",
      type: "date",
      label: "From",
      placeholder: "Enter remarks...",
      is_condition: true,
      condition:
        values.coupon_apply_for_all_time == COUPEN_APPLY_FOR_ALL_TIME.NO,
    },
    {
      name: "to",
      type: "date",
      label: "To",
      placeholder: "Enter remarks...",
      is_condition: true,
      condition:
        values.coupon_apply_for_all_time == COUPEN_APPLY_FOR_ALL_TIME.NO,
    },

    {
      name: "coupon_type",
      type: "select",
      placeholder: "Enter title...",
      label: "Select   type",
      options: [
        { value: COUPEN_TYPE.product, label: "Free Product" },
        { value: COUPEN_TYPE.discount, label: "Discount" },
        { value: COUPEN_TYPE.free_shiipping, label: "Free shipping" },
      ],
    },
    {
      name: "free_product",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          values.coupon_type == COUPEN_TYPE.product && (
            <CustomMultiSelect
              name="free_product"
              label="Select Product To free "
              options={freeProductOptions}
              onSearchChange={listProducts}
              onSelectionChange={handleCustomSelect}
              selected={values.free_product}
              errors={errors}
              not_multy={true}
              singleSelectChange={handleCustomSelect}
            />
          )
        );
      },
    },
    {
      name: "discount_type",
      type: "select",
      label: "Select Discount type",
      placeholder: "Enter title...",
      options: [
        { value: COUPEN_DISCOUNT_TYPE.value, label: "Based on Value" },
        {
          value: COUPEN_DISCOUNT_TYPE.parcentage,
          label: "Based on Percantage",
        },
      ],
      is_condition: true,
      condition: values.coupon_type == COUPEN_TYPE.discount,
    },
    {
      name: "price_validation",
      type: "select",
      label: "Select Price Validation",
      placeholder: "Enter title...",
      options: [
        { value: COUPEN_PRICE_VALIDATION.all, label: "On All" },
        {
          value: COUPEN_PRICE_VALIDATION.based_on_price,
          label: "Based on Price",
        },
      ],
      is_condition: true,
      condition: values.coupon_type == COUPEN_TYPE.discount,
    },
    {
      name: "discount_value",
      type: "number",
      label: "Discount Value",
      placeholder: "Enter remarks...",
      is_condition: true,
      condition:
        // values.price_validation == COUPEN_PRICE_VALIDATION.all &&
        values.coupon_type == COUPEN_TYPE.discount,
    },
    {
      name: "minimum_price",
      type: "number",
      label: "Minimum Price Value",
      placeholder: "Enter remarks...",
      // is_condition: true,
      // condition:
        // values.price_validation == COUPEN_PRICE_VALIDATION.all &&
        // values.coupon_type == COUPEN_TYPE.discount,
    },
    {
      name: "up_discount_value",
      type: "number",
      label: "Up  Discount Value",
      placeholder: "Enter remarks...",
      is_condition: true,
      condition:
        values.price_validation == COUPEN_PRICE_VALIDATION.based_on_price &&
        values.coupon_type == COUPEN_TYPE.discount,
    },
    {
      name: "is_on_discounted_product",
      type: "radio",
      label: "Is Apply only on discounted product",
      placeholder: "Enter Name...",
      options: [
        { value: COUPEN_APPLY_ON_DISCOUNTED_PRODUCT.YES, label: "Required" },
        { value: COUPEN_APPLY_ON_DISCOUNTED_PRODUCT.NO, label: "No Required" },
      ],
      is_condition: true,
      condition:
        // values.price_validation == COUPEN_PRICE_VALIDATION.based_on_price &&
        values.coupon_type == COUPEN_TYPE.discount,
    },
    // {
    //   name: "is_apply_with_other_coupon",
    //   type: "radio",
    //   label: "Is Apply with Other Coupon",
    //   placeholder: "Enter Name...",
    //   options: [
    //     { value: COUPEN_APPLY_WITH_OTHER_COUPONS.YES, label: "Required" },
    //     { value: COUPEN_APPLY_WITH_OTHER_COUPONS.NO, label: "No Required" },
    //   ],
    // },
    // {
    //   name: "options",
    //   label: "Year",
    //   type: "custom",
    //   customRender: () => {
    //     return (
    //       values.price_validation == COUPEN_PRICE_VALIDATION.based_on_price &&
    //       values.coupon_type == COUPEN_TYPE.discount && (
    //         <CouponPriceValidation
    //           name="options"
    //           label="Options  "
    //           errors={errors}
    //           onChange={handleCustomSelect}
    //           fields={values?.options}
    //         />
    //       )
    //     );
    //   },
    // },
    {
      name: "category_validation",
      type: "select",
      label: "Select Category Validation",
      placeholder: "Enter title...",
      options: [
        { value: COUPEN_CATEGORY_VALIDATION.all, label: "On All" },
        { value: COUPEN_CATEGORY_VALIDATION.category, label: "On Category" },
        {
          value: COUPEN_CATEGORY_VALIDATION.department,
          label: "On Department",
        },
        { value: COUPEN_CATEGORY_VALIDATION.product, label: "On Product" },
      ],
    },

    {
      name: "products",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          values.category_validation == COUPEN_CATEGORY_VALIDATION.product && (
            <CustomMultiSelect
              name="products"
              label="Select Product To free "
              options={productOptions}
              onSearchChange={listProducts}
              onSelectionChange={handleCustomSelect}
              selected={values.products}
              errors={errors}
            />
          )
        );
      },
    },
    {
      name: "department_ids",
      type: "select",
      label: "Select Departments",
      placeholder: "Enter title...",
      options: departments,
      isMultiple: true,
      // customChange: handleCustomSelect,
      is_condition: true,
      condition:
        values.category_validation == COUPEN_CATEGORY_VALIDATION.department,
    },

    {
      name: "categories",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          values.category_validation == COUPEN_CATEGORY_VALIDATION.category && (
            <CustomMultiSelect
              name="categories"
              label="Select Categorious  "
              options={multiCategoryOptions}
              onSearchChange={listMultiCategories}
              onSelectionChange={handleCustomSelect}
              selected={values.categories}
              errors={errors}
            />
          )
        );
      },
    },
    {
      name: "activate",
      type: "radio",
      label: "activate",
      placeholder: "Enter Name...",
      options: [
        { value: COUPEN_ACTIVATE.YES, label: "Yes" },
        { value: COUPEN_ACTIVATE.NO, label: "No  " },
      ],
    },
  ];
};
