"use client";

import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";
import { department_fields, redirect_url_fields } from "@/helpers/formField";
import { department_colomn, redirect_url_colomn } from "@/helpers/tableColumn";
import { updateOrderOfDept } from "@/store/actions/admin/department";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addSlugField, mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import TableWithDnd from "@/components/globals/TableWithDnd";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  addRedirectUrl,
  deleteRedirectUrl,
  editRedirectUrl,
  getRedirectUrl,
} from "@/store/actions/admin/redurectUrl";
import Pagination from "@/components/globals/Pagination";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({ name: "" });
  const [errors, setErrors] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [openDel, setOpenDel] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();
    console.log("Form Submitted", values, mode);

    try {
      const api = values.id
        ? editRedirectUrl(values as any)
        : addRedirectUrl(values as any);
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

  const list = async (page: any) => {
    try {
      setCurrentPage(page);
      const res = await dispatch(
        getRedirectUrl({ page: page, search: search })
      ).unwrap();

      if (res.success) {
        console.log(res.data);
        setApiHit(true);
        setTableData(res?.data?.result);
        setTotalRecords(res.data.totalRecords);
        setShowPagination(res.data.showPagination);
        setTotalPages(res.data.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list(1);
  }, [search]);

  const toggleDrawer = (data: Record<string, any> = {}) => {
    list(1);
    setValues(data);
    setOpen(!open);
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteRedirectUrl(values as any);

      const res = await dispatch(api).unwrap();

      console.log("Submitted values:", res);

      if (res.success) {
        setValues({});
        setOpenDel(!openDel);
        list(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDelModel = (data: Record<string, any> = {}) => {
    setValues(data);
    setOpenDel(!open);
  };

  const updateRowOrderAPI = async (data: any) => {
    console.log(data, "data =======");
    setTableData(data);
    const api = updateOrderOfDept({ departments: data });

    const res = await dispatch(api).unwrap();

    if (res.success) {
      list(1);
    }
  };

  return (
    <div>
      <div className="lg:px-3 py-4 flex items-center flex-col sm:flex-row">
        <div className="font-bold text-xl mb-2 w-full">Departments</div>
        <div className="lg:px-3 w-full md:text-right">
          <button
            onClick={() => toggleDrawer({})}
            className="bg-black hover:bg-black text-white py-1 px-2 rounded w-full md:w-max"
          >
            <h3 className="text-base font-medium  "> Add New</h3>
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="border-black p-2 w-1/2 rounded border-2"
        />
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
        formFields={redirect_url_fields}
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />

      <Table
        apiHit={apiHit}
        columns={redirect_url_colomn(toggleDrawer, openDelModel)}
        tableData={tableData}
      />
      <Pagination
        totalRecords={totalRecords}
        totalPages={totalPage}
        currentPage={currentPage}
        setCurrentPage={list}
        limit={1}
        showPagination={showPagination}
        tableDataLength={tableData.length}
      />
    </div>
  );
};

export default Page;
