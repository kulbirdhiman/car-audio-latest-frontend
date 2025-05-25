"use client";

import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";

import { add_on_colomn } from "@/helpers/tableColumn";
import {
  addAddOn,
  deleteAddOn,
  editAddOn,
  getAddOns,
} from "@/store/actions/admin/addOn";
import { getDepartment } from "@/store/actions/admin/department";
import { getCategories } from "@/store/actions/admin/category";
import { getProduct } from "@/store/actions/admin/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import CustomMultiSelect from "@/components/globals/Fields/CustomMultiSelect";

// === INTERFACES ===








interface GetAddOnFieldsProps {
  departments?: any;
  categories?: any;
  products?: any;
  productsOnAdd: any;
  listProducts: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCustomSelect: (value: any, name: string) => void;
  values: any;
  errors: any;
}

// === MAIN PAGE ===

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [apiHit, setApiHit] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [values, setValues] = useState<any>({ name: "" });
  const [errors, setErrors] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);

  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [productsOnAdd, setProductsOnAdd] = useState<any[]>([]);

  const handleSubmit = async (
    e: React.FormEvent,
    values: any,
    mode: string
  ) => {
    e.preventDefault();
    try {
      const api = values.id ? editAddOn(values) : addAddOn(values);
      const res = await dispatch(api).unwrap();
      if (res.success) {
        toggleDrawer({});
      }
    } catch (error) {
      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Submit failed:", formErrors);
    }
  };

  const handleCustomSelect = (value: any, name: string) => {
    setValues({ ...values, [name]: value });
  };

  const listDepartments = async () => {
    try {
      const res = await dispatch(getDepartment({})).unwrap();
      if (res.success) {
        const option = res.data.result.map((row:any ) => ({
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
        const option = res.data.result.map((row: any) => ({
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

  const listProducts = async (e: { target: { value: any; name: string } }) => {
    try {
      let limit = 20;
      const data: Record<string, any> = {};
      const product_ids: any[] = [];

      if (e?.target?.value) {
        const search = e.target.value;
        if (search.length > 0 && totalRecords > limit) {
          limit = totalRecords;
        }
        data.search = search;
        product_ids.push(values[e.target.name]);
      }

      const res = await dispatch(
        getProduct({ ...data, limit, product_ids })
      ).unwrap();

      if (res.success) {
        setApiHit(true);
        const option = res.data.result.map((row: any) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));

        if (e.target.name === "extras") setProducts(option);
        if (e.target.name === "product_ids") setProductsOnAdd(option);

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
      const res = await dispatch(getAddOns({})).unwrap();
      if (res.success) {
        setApiHit(true);
        setTableData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = (data: any = {}) => {
    setValues(data);
    setOpen(!open);
    listAddOn();
    listDepartments();
    listCategoryies();
    listProducts({ target: { value: "", name: "extras" } });
    listProducts({ target: { value: "", name: "product_ids" } });
  };

  const deleteRecord = async () => {
    try {
      const api = deleteAddOn(values);
      const res = await dispatch(api).unwrap();
      if (res.success) {
        setValues({});
        setOpenDel(!openDel);
        listAddOn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDelModel = (data: any = {}) => {
    setValues(data);
    setOpenDel(!open);
  };

  useEffect(() => {
    listProducts({ target: { value: values.extras, name: "extras" } });
    listProducts({ target: { value: values.product_ids, name: "product_ids" } });
    listDepartments();
    listCategoryies();
  }, [values, open]);

  useEffect(() => {
    listAddOn();
  }, []);

  return (
    <div>
      <div className="lg:px-3 py-4 flex items-center flex-col sm:flex-row">
        <div className="font-bold text-xl mb-2 w-full">Add On</div>
        <div className="lg:px-3 w-full md:text-right">
          <button
            onClick={() => toggleDrawer({})}
            className="bg-black hover:bg-black text-white py-1 px-2 rounded w-full md:w-max"
          >
            <h3 className="text-base font-medium">Add New</h3>
          </button>
        </div>
      </div>

      <DeleteModal open={openDel} setOpen={setOpenDel} deleteRecord={deleteRecord} />

      <RightDrawerForm
        title={values.id ? "Edit" : "Add"}
        open={open}
        toggleDrawer={toggleDrawer}
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={getAddOnFields({
          departments,
          categories,
          products,
          productsOnAdd,
          listProducts,
          handleCustomSelect,
          values,
          errors,
        })}
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />

      <Table
        apiHit={apiHit}
        columns={add_on_colomn(toggleDrawer, openDelModel)}
        tableData={tableData}
      />
    </div>
  );
};

export default Page;


const getAddOnFields = ({
  departments = [],
  categories = [],
  products = [],
  productsOnAdd,
  listProducts,
  handleCustomSelect,
  values,
  errors,
}: GetAddOnFieldsProps) => {
  return [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name...",
    },
    {
      name: "extras",
      label: "Year",
      type: "custom",
      customRender: () => (
        <CustomMultiSelect
          name="extras"
          label="Select Extras"
          options={products}
          onSearchChange={listProducts}
          onSelectionChange={handleCustomSelect}
          selected={values.extras}
          errors={errors}
        />
      ),
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
      label: "Select Categories",
      placeholder: "Enter title...",
      options: categories,
      isMultiple: true,
    },
    {
      name: "product_ids",
      label: "Product",
      type: "custom",
      customRender: () => (
        <CustomMultiSelect
          name="product_ids"
          label="Select Product"
          options={productsOnAdd}
          onSearchChange={listProducts}
          onSelectionChange={handleCustomSelect}
          selected={values.product_ids}
          errors={errors}
        />
      ),
    },
  ];
};
