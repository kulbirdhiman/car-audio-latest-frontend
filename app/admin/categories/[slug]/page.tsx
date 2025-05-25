"use client";

import React, { useEffect, useState } from "react";
import RightDrawerForm from "@/components/globals/RightDrawerForm";
import Table from "@/components/globals/Table";
import { getCarModelFields, getCategoryFields } from "@/helpers/formField";
import { category_colomn, model_colomn } from "@/helpers/tableColumn";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addSlugField, mapServerErrors } from "@/helpers/commonFunction";
import DeleteModal from "@/components/globals/DeleteModel";
import {
 
  detailCategory,
 
} from "@/store/actions/admin/category";
import { useParams } from "next/navigation";
import { addCarModel, deleteCarModel, editCarModel } from "@/store/actions/admin/carModel";

const is_all = 1 ;
const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({ name: "" });
  const [errors, setErrors] = useState({});
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [models, setModels] = useState<Record<string, any>[]>([]);
  const [category, setCategory] = useState<Record<string, any>>({});
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
        ? editCarModel({ ...values, category_id: category.id } as any)
        : addCarModel({ ...values, category_id: category.id } as any);
      const res = await dispatch(api).unwrap();

      console.log("Submitted values:", res);

      if (res.success) {
        toggleDrawer({ is_all});
      }
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  const viewCategory = async (data: Record<string, any>) => {
    try {
      const res = await dispatch(
        detailCategory({ ...data, slug: slug })
      ).unwrap();

      if (res.success) {
        console.log(res);
        setApiHit(true);
        setCategory((res.data as any).result);
        setTableData((res.data.result as any).car_models);
        const option = (res.data.result as any).car_models?.map(
          (row: { id: number; name: string }) => ({
            value: row.id,
            label: row.name,
            ...row,
          })
        );

        setModels(option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewCategory({ is_all });
  }, []);

  const toggleDrawer = (data: Record<string, any> = {}) => {
    viewCategory({ ...data });
    setValues(data);
    setOpen(!open);
  };
  const deleteRecord = async (data: Record<string, any> = {}) => {
    try {
      const api = deleteCarModel(values as any);

      const res = await dispatch(api).unwrap();

      if (res.success) {
        viewCategory({is_all})
        setValues({});
        setOpenDel(!openDel);
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
        <div className="font-bold text-xl mb-2 w-full">
          {" "}
          Models of Category {category?.name}{" "}
        </div>
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
        toggleData= {{is_all}}
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={
          values.id
            ? addSlugField(getCarModelFields(models))
            : getCarModelFields(models)
        }
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />

      <Table
        apiHit={apiHit}
        columns={model_colomn(toggleDrawer, openDelModel)} //
        tableData={tableData}
      />
    </div>
  );
};

export default Page;
