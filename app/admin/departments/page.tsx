"use client";

import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";
import { department_fields } from "@/helpers/formField";
import { department_colomn } from "@/helpers/tableColumn";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartment,
  updateOrderOfDept,
} from "@/store/actions/admin/department";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addSlugField, mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import TableWithDnd from "@/components/globals/TableWithDnd";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({ name: "" });
  const [errors, setErrors] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
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
        ? editDepartment(values as any)
        : addDepartment(values as any);
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
        console.log(res.data);
        setApiHit(true);
        setTableData(res?.data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listDepartments();
  }, []);

  const toggleDrawer = (data: Record<string, any> = {}) => {
    listDepartments();
    setValues(data);
    setOpen(!open);
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteDepartment(values as any);

      const res = await dispatch(api).unwrap();

      console.log("Submitted values:", res);

      if (res.success) {
        setValues({});
        setOpenDel(!openDel);
        listDepartments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDelModel = (data: Record<string, any> = {}) => {
    setValues(data);
    setOpenDel(!open);
  };

  const updateRowOrderAPI = async (data:any)=>{
console.log(data,"data =======");
setTableData(data)
const api = updateOrderOfDept({departments:data});

const res = await dispatch(api).unwrap();

 
if (res.success) {
 
  listDepartments();
}
  }

  return (
    <div>
      <div className="w-full  flex items-center justify-between">
        <div className="font-bold text-xl mb-2 w-full">Departments</div>
        {/* <div className=" md:text-right"> */}
          <button
            onClick={() => toggleDrawer({})}
            className="bg-black flex hover:bg-black text-white py-1 px-2 rounded w-[80px] "
          >
            + Add
          </button>
        {/* </div> */}
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
          values.id ? addSlugField(department_fields) : department_fields
        }
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />
   <DndProvider backend={HTML5Backend}>
      <TableWithDnd
        apiHit={apiHit}
        columns={department_colomn(toggleDrawer, openDelModel)} //
        tableData={tableData}
        setTableData={setTableData}
        updateRowOrderAPI={updateRowOrderAPI}
      />
      </DndProvider>
    </div>
  );
};

export default Page;
