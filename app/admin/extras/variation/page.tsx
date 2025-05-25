"use client";
import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";
import { add_on_colomn, variation_colomn } from "@/helpers/tableColumn";
import { getDepartment } from "@/store/actions/admin/department";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addSlugField, mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import { getCategories } from "@/store/actions/admin/category";
import CustomMultiSelect from "@/components/globals/Fields/CustomMultiSelect";
import { getProduct } from "@/store/actions/admin/product";

import { deleteAddOn } from "@/store/actions/admin/addOn";
import VariationField from "@/components/globals/Fields/VariationField";
import {
  addVariation,
  deleteVariation,
  editVariation,
  getVariations,
} from "@/store/actions/admin/variation";
import { IS_MULTY_PRICE, OPTION_TYPE } from "@/app/constants";
import CustomOption from "@/components/globals/Fields/CustomOption";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fields = [{ id: Date.now(), in_stock: 1, name: "", price: 0 }];

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({
    name: "",
    options: fields,
  });
  const [errors, setErrors] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [openDel, setOpenDel] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [productsOnAdd, setProductsOnAdd] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();
    console.log("Form Submitted", values, mode);

    try {
      const api = values.id
        ? editVariation(values as any)
        : addVariation(values as any);
      const res = await dispatch(api).unwrap();

  
      if (res.success) {
        toggleDrawer({ options: fields });
      }
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  const handleCustomSelect = (value:any, name:any) => {
    setValues({ ...values, [name]: value });
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

  const listCategoryies = async () => {
    try {
      const res = await dispatch(getCategories({})).unwrap();

      if (res.success) {
        // console.log(res.data.result);
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));
        setCategories(option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listProducts = async (e:any) => {
    try {
      let limit = 20;
      const data = {};
      const product_ids: any[] = [];
      if (e?.target?.value) {
        const search = e.target.value;
        if (search && search.length > 0 && totalRecords > limit) {
          limit = totalRecords;
        }
        (data as any).search = search;
        product_ids.push(values[e.target.name]);
      }

      
      console.log("product_ids=====",product_ids);
      

      const res = await dispatch(
        getProduct({ ...data, limit: limit, product_ids: [...product_ids] })
      ).unwrap();

      if (res.success) {
        // console.log(res.data);
        setApiHit(true);
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));
        // if (e.target.name == "extras") {
        //   setProducts(option);
        // }

        if (e.target.name == "product_ids") {
          console.log("option",option);
          
          setProductsOnAdd(option);
        }

        if (res.data.totalRecords > totalRecords) {
          setTotalRecords(res.data.totalRecords);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listAddOn = async () => {
    try {
      const res = await dispatch(getVariations({})).unwrap();

      if (res.success) {
        setApiHit(true);
        setTableData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
 
    listAddOn();
  }, []);

  useEffect(() => {
    // listProducts({ target: { value: values.extras, name: "extras" } });
    listProducts({ target: { value: values.product_ids, name: "product_ids" } });
    listDepartments();
    listCategoryies();
 
  }, [ values,open]);

  

  const toggleDrawer = (data: Record<string, any> = {}) => {
    setValues(data);
    setOpen(!open);
    listAddOn();
    listDepartments();
    listCategoryies();
    // listProducts({ target: { value: "", name: "extras" } });
    // listProducts({ target: { value: "", name: "product_ids" } });
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteVariation(values as any);

      const res = await dispatch(api).unwrap();

      console.log("Submitted values:", res);

      if (res.success) {
        // setValues({});
        setOpenDel(!openDel);
        listAddOn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDelModel = (data: Record<string, any> = {}) => {
    setValues(data);
    setOpenDel(!open);
  };

  return (
    <div>
      <div className="lg:px-3 py-4 flex items-center flex-col sm:flex-row">
        <div className="font-bold text-xl mb-2 w-full">Variations</div>
        <div className="lg:px-3 w-full md:text-right">
          <button
            onClick={() => toggleDrawer({ options: fields })}
            className="bg-black hover:bg-black text-white py-1 px-2 rounded w-full md:w-max"
          >
            <h3 className="text-base font-medium  "> Add New</h3>
          </button>
        </div>
      </div>
      <DeleteModal
        open={openDel}
        setOpen={setOpenDel}
        deleteRecord={deleteRecord}
      />

      <RightDrawerForm
        //  formClassName="grid grid-cols-2 gap-2"
        toggleData={{ options: fields }}
        title={values.id ? "Edit" : "Add"}
        open={open}
        toggleDrawer={toggleDrawer}
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={getAddOnFields(
          departments,
          categories,
          products,
          productsOnAdd,
          listProducts,
          handleCustomSelect,
          values,
          errors,
          setValues
        )}
        handleSubmit={handleSubmit}
        submitTitle="Submit"
        customClass="bg-white w-full max-w-[700px] h-full shadow-lg   transform transition-transform duration-300"
      />

      <Table
        apiHit={apiHit}
        columns={variation_colomn(toggleDrawer, openDelModel)} //
        tableData={tableData}
      />
    </div>
  );
};

export default Page;

const getAddOnFields = (
  departments: any[] = [],
  categories: any[] = [],
  products: any[] = [],
  productsOnAdd :any,
  listProducts :any,
  handleCustomSelect:any,
  values :any,
  errors:any,
  setValues:any
)  => {
  return [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name...",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Enter Title...",
    },
    {
      name: "is_required",
      type: "radio",
      label: "Is Required",
      placeholder: "Enter Name...",
      options: [
        { value: 1, label: "Required" },
        { value: 0, label: "No Required" },
      ],
    },
    {
      name: "is_quantity_based",
      type: "radio",
      label: "Is Quantity based",
      placeholder: "Enter Name...",
      options: [
        { value: IS_MULTY_PRICE, label: "price based on quantity" },
        { value: 0, label: "price count only one time" },
      ],
    },
    {
      name: "is_multy",
      type: "radio",
      label: "Is Multy Select",
      placeholder: "Enter Name...",
      options: [
        { value: 1, label: "Multiselect" },
        { value: 0, label: "Single select" },
      ],
    },
    {
      name: "type_of_option",
      type: "radio",
      label: "type of option",
      placeholder: "Enter Name...",
      options: [
        { value:OPTION_TYPE.custom, label: "custom" },
        { value: OPTION_TYPE.checkbox, label: "checkbox" },
      ],
    },
    {
      name: "options",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          values.type_of_option  ==  OPTION_TYPE.custom &&
         <CustomOption  values={values} setValues={setValues} />
        );
      },
    },

    {
      name: "options",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          values.type_of_option  !=  OPTION_TYPE.custom &&
          <VariationField
            name="options"
            label="Options"
            errors={errors}
            onChange={handleCustomSelect}
            fields={values.options}
          />
        );
      },
    },

    {
      name: "product_ids",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          <CustomMultiSelect
            name="product_ids"
            label="Select product  "
            options={productsOnAdd}
            onSearchChange={listProducts}
            onSelectionChange={handleCustomSelect}
            selected={values.product_ids}
            errors={errors}
          />
        );
      },
    },
    {
      name: "department_ids",
      type: "select",
      label: "Select Department",
      placeholder: "Enter title...",
      options: departments,
      isMultiple: true,
    },
    {
      name: "category_ids",
      type: "select",
      label: "Select Categorious",
      placeholder: "Enter title...",
      options: categories,
      isMultiple: true,
    },
  ];
};
