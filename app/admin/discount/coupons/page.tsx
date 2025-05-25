"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/globals/Table";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";

import { addAddOn, deleteAddOn, editAddOn } from "@/store/actions/admin/addOn";
import CouponForm from "@/components/admin/CouponForm";
import { deleteCoupon, getCoupons } from "@/store/actions/admin/coupon";
import Pagination from "@/components/globals/Pagination";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const fields = [{ id: Date.now(), price_up_to: 0, discount: 0 }];
  const [values, setValues] = useState<any>({ options: fields });
  const [errors, setErrors] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [openDel, setOpenDel] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPage, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPagination, setShowPagination] = useState([]);


  const handleCustomSelect = (value:any, name:any) => {
    setValues({ ...values, [name]: value });
  };

  const list = async (page:any) => {
    try {
      setCurrentPage(page);
      const res = await dispatch(getCoupons({page})).unwrap();

      if (res.success) {
        setApiHit(true);
        setTableData(res.data.result);
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
  }, []);

  const toggleDrawer = (data: any = {}) => {
    setValues(data);
    setOpen(!open);
    list(1);
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteCoupon(values as any);

      const res = await dispatch(api).unwrap();

      if (res.success) {
        setValues({ options: fields });
        setOpenDel(!openDel);
        list(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDelModel = (data: any = {}) => {
    setValues(data);
    setOpenDel(!open);
  };

  return (
    <div>
      <div className="lg:px-3 py-4 flex items-center flex-col sm:flex-row">
        <div className="font-bold text-xl mb-2 w-full">Coupen Code</div>
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

      <CouponForm
        values={values}
        setValues={setValues}
        setErrors={setErrors}
        errors={errors}
        setOpen={setOpen}
        open={open}
        toggleDrawer={toggleDrawer}
      />

      <Table
        apiHit={apiHit}
        columns={coupon_code_colomn(toggleDrawer, openDelModel)} //
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

  const coupon_code_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },

    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <button
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
        </div>
      ),
    },
  ];
};
