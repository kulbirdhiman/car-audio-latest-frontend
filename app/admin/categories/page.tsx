"use client";

import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";
import { getCategoryFields } from "@/helpers/formField";
import { category_colomn } from "@/helpers/tableColumn";
import {
   getDepartment,
} from "@/store/actions/admin/department";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addSlugField, mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "@/store/actions/admin/category";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({ name: "" });
  const [errors, setErrors] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [departments, setDepartments] = useState<Record<string, any>[]>([]);
  const [openDel, setOpenDel] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();
    console.log("Form Submitted", values, mode);

    try {
      const api = values.id
        ? editCategory(values as any)
        : addCategory(values as any);
      const res = await dispatch(api).unwrap();

      console.log("Submitted values:", res);

      if (res.success) {
        toggleDrawer({});
      }
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  const listDepartments = async () => {
    try {
      const res = await dispatch(getDepartment({})).unwrap();

      if (res.success) {
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
        }));
        setDepartments(option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listCategoryies = async () => {
    try {
      const res = await dispatch(getCategories()).unwrap();

      if (res.success) {
        console.log(res.data);
        setApiHit(true);
        setTableData(res?.data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCategoryies();
    listDepartments();
  }, []);

  const toggleDrawer = (data: Record<string, any> = {}) => {
    listCategoryies();
    listDepartments();
    setValues(data);
    setOpen(!open);
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteCategory(values as any);

      const res = await dispatch(api).unwrap();

      if (res.success) {
        setValues({});
        setOpenDel(!openDel);
        listCategoryies();
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
      <div className="lg:px-3 py-2 flex items-center flex-col sm:flex-row">
        <div className="font-bold text-xl mb-2 w-full">Categories</div>
        <div className="lg:px-3 w-full md:text-right">
          <button
            onClick={() => toggleDrawer({})}
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
        title={values.id ? "Edit" : "Add"}
        open={open}
        toggleDrawer={toggleDrawer}
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={
          values.id
            ? addSlugField(getCategoryFields(departments))
            : getCategoryFields(departments)
        }
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />

      <Table
        apiHit={apiHit}
        columns={category_colomn(toggleDrawer, openDelModel)} //
        tableData={tableData}
      />
    </div>
  );
};

export default Page;
