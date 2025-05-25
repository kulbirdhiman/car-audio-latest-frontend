"use client";

import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";
import { department_fields } from "@/helpers/formField";
import { department_colomn, product_colomn } from "@/helpers/tableColumn";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addSlugField, mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import Link from "next/link";
import { deleteProduct, getProduct } from "@/store/actions/admin/product";
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

  const list = async (page:any) => {
    try {
      setCurrentPage(page);
      const res = await dispatch(getProduct({ page,search })).unwrap();

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
    list(currentPage);
    setValues(data);
    setOpen(!open);
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteProduct(values as any);

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

  return (
    <div>
      <div className="flex py-2 w-[100vw]">
        <h2 className="font-bold text-xl mb-2 items-center flex gap-4  w-full">
          Product
        </h2>
        <div className=" flex gap-2 h-10 items-center w-full md:text-right">
          
            <input placeholder="search ..." value={search} onChange={(e)=>{setSearch(e.target.value)}} className="border py-1 px-2  rounded" />
          <Link
            href={"/admin/products/add"}
            className="bg-black block hover:bg-black text-white py-1 px-2 rounded "
          >
            <h3 className="text-base font-medium  "> Add New</h3>
          </Link>
        </div>
      </div>
      <DeleteModal
        open={openDel}
        setOpen={setOpenDel}
        deleteRecord={deleteRecord}
      />

      <Table
        apiHit={apiHit}
        columns={product_colomn(toggleDrawer, openDelModel)} //
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
