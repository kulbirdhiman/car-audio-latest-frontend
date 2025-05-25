"use client";
import React, { useEffect, useState } from "react";
import DynamicForm, { FormField } from "@/components/globals/DynamicForm";
import { getDepartment } from "@/store/actions/admin/department";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import { detailCategory, getCategories } from "@/store/actions/admin/category";
import YearRangePicker from "../globals/Fields/YearRangePicker";
import { setImageErrors } from "../globals/Fields/UploadFile";
import UploadImage from "../globals/Fields/UploadFile";
import ColorPriceFields, {
  setColorPriceError,
} from "../globals/Fields/ColorPrice";
import {
  addProduct,
  deleteFilesApi,
  editProduct,
} from "@/store/actions/admin/product";
import { mapServerErrors } from "@/helpers/commonFunction";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CustomMultiSelect from "../globals/Fields/CustomMultiSelect";
import { getCarModels } from "@/store/actions/admin/carModel";
import { IN_STOCK, USER_MANUALS } from "@/app/constants";

const AddProduct: React.FC<any> = ({ values, setValues }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [deleteFiles, setDeleteFiles] = useState([]);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

  const [multiModelOptions, setMultiModelOptions] = useState<any[]>([]);
  const [multiCategoryOptions, setMultiCategoryOptions] = useState<any[]>([]);

  const COLOR_VALIDATION = [
    { name: "is_color", value: "1", label: "Color option is required" },
    { name: "is_color", value: "0", label: "No color option need" },
  ];

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

  const listCategoryies = async (data:any) => {
    try {
      const res = await dispatch(getCategories(data)).unwrap();

      if (res.success) {
        console.log(res.data.result);
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));
        setCategories(option);
        if (values.category_id) {
          if (values.category_id) {
            const selected = option.find((r) => r.value === values.category_id);

            if (selected) {
              viewCategory({ slug: (selected as any).slug, is_all: 1 });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewCategory = async (data: Record<string, any>) => {
    try {
      const res = await dispatch(
        detailCategory({ ...data, slug: data.slug })
      ).unwrap();

      if (res.success) {
        console.log(res);

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

  const handleSelectChange =
    (setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>) =>
    (name: string, value: any) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  const handleModelChange = () => {
    setValues({ ...values, from: null, to: null });
  };

  const handleDepartmentChange = (selected:any) => {
    setCategories([]);
    setModels([]);

    listCategoryies({ department_id: selected.value });
    setValues({
      ...values,
      model_id: null,
      category_id: null,
      from: "",
      to: "",
    });
  };

  const handleCategoryChange = (selected:any) => {
    setModels([]);
    viewCategory({ slug: selected.slug, is_all: 1 });
    setValues({ ...values, model_id: null, from: null, to: null });
  };

  const listMultiModel = () => {};

  const handleCustomSelect = (value:any, name:any) => {
    setValues({ ...values, [name]: value });
  };

  const listMultiModels = async (e:any) => {
    try {
      const data = {};
      const model_ids: any[] = [];
      if (e?.target?.value) {
        const search = e.target.value;
        (data as any).search = search;
        model_ids.push(values.multi_models);
      }

      const res = await dispatch(
        getCarModels({ ...data, limit: 1000000, model_ids: [...model_ids] })
      ).unwrap();

      console.log("res", res);

      if (res.success) {
        const option = res.data.result.map((row) => ({
          value: row.id,
          label: row.name,
          ...row,
        }));

        setMultiModelOptions(option);
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
        muti_categories.push(values.muti_categories);
      }

      const res = await dispatch(
        getCategories({
          ...data,
          limit: 10000000,
          category_ids: [...muti_categories],
        })
      ).unwrap();

      console.log("res", res);

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

  const StockOptions:any[] = [
    { value: IN_STOCK, label: "In Stock" },
    { value: 0, label: "Out of Stock " },
  ];

  const formFields: FormField[] = [
    {
      name: "images",
      label: "Upload Images",
      type: "custom",
      customClass: "col-span-2",
      customRender: () => {
        return (
          <div className="col-span-2">
            {/* {values.images.map((image:any, i:number) => ( */}
              <UploadImage
                setDeleteFiles={setDeleteFiles}
                deleteFiles={deleteFiles}
                customClass="col-span-2"
                values={values}
                // index={i}
                setValues={setValues}
                errors={errors}
                // key={i}
              />
            {/* ))} */}
          </div>
        );
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your email",
    },
    {
      name: "search_keywords",
      label: "Search Key Word",
      type: "text",
      placeholder: "Enter your key words",
    },
 
    {
      name: "sku",
      label: "Sku",
      type: "text",
      placeholder: "Enter your Sku",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter quantity",
    },
    {
      name: "regular_price",
      label: "Regular Price",
      type: "number",
      placeholder: "Enter quantity",
    },
    {
      name: "discount_price",
      label: "Discount Price",
      type: "number",
      placeholder: "Enter Discount price",
    },
    // {
    //   name: "wholesale_price",
    //   label: "Wholesale Price",
    //   type: "number",
    //   placeholder: "Enter Wholesale price",
    // },
    {
      name: "length",
      label: "Length",
      type: "number",
      placeholder: "Enter Length",
    },
    {
      name: "height",
      label: "Height",
      type: "number",
      placeholder: "Enter Height",
    },
    {
      name: "width",
      label: "Width",
      type: "number",
      placeholder: "Enter Width",
    },
    {
      name: "weight",
      label: "Weight",
      type: "number",
      placeholder: "Enter Width",
    },
    {
      name: "department_id",
      type: "select",
      label: "Select Departments",
      placeholder: "Enter title...",
      options: departments,
      customChange: handleDepartmentChange,
    },
    {
      name: "category_id",
      type: "select",
      label: "Select Category",
      placeholder: "Select Category",
      options: categories,
      parent_field: "department_id",
      customChange: handleCategoryChange,
    },
    {
      name: "model_id",
      type: "select",
      label: "Select Model",
      placeholder: "Select Category",
      options: models,
      parent_field: "category_id",
      customChange: handleModelChange,
    },
    {
      name: "year",
      label: "Year",
      type: "custom",
      customRender: () => {
        if (values.model_id) {
          return <YearRangePicker values={values} setValues={setValues} />;
        }
      },
    },
    {
      name: "description",
      label: "Description",
      type: "richtext",
      placeholder: "Enter Width",
    },
    {
      name: "specification",
      label: "Specification",
      type: "richtext",
      placeholder: "Enter Width",
    },
   
    
    {
      name: "multi_models",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          <CustomMultiSelect
            name="multi_models"
            label="Select Models  "
            options={multiModelOptions}
            onSearchChange={listMultiModels}
            onSelectionChange={handleCustomSelect}
            selected={values.multi_models}
            errors={errors}
          />
        );
      },
    },
    {
      name: "multi_categories",
      label: "Year",
      type: "custom",
      customRender: () => {
        return (
          <CustomMultiSelect
            name="multi_categories"
            label="Select Categorious  "
            options={multiCategoryOptions}
            onSearchChange={listMultiCategories}
            onSelectionChange={handleCustomSelect}
            selected={values.multi_categories}
            errors={errors}
          />
        );
      },
    },
    {
      name: "in_stock",
      type: "radio",
      label: "In Stock",
      placeholder: "Enter Name...",
      options: StockOptions,
    },
    {
      name: "demo_video",
      label: "Demo Video",
      type: "url",
      placeholder: "Enter your url ",
    },
    {
      name: "installation_video",
      label: "Installation Video",
      type: "url",
      placeholder: "Enter your url ",
    },
    {
      name: "user_manual",
      type: "select",
      label: "Select user manual",
      placeholder: "Select user manual",
      options: USER_MANUALS,
 
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter your Title",
    },
    {
      name: "seo_description",
      label: "Seo Description",
      type: "textarea",
      placeholder: "Enter your description",
    },
    {
      name: "seo_keywords",
      label: "Seo Key Words",
      type: "textarea",
      placeholder: "Enter your key words",
    },
  

    // {
    //   name: "is_color_price",
    //   label: "Colour or not",
    //   type: "select",
    //   options: COLOR_VALIDATION,
    //   placeholder: "Enter quantity",
    //   customChange: handleSelectChange,
    // },
    // {
    //   name: "color_price",
    //   label: "Fill Colors",
    //   type: "custom",
    //   customClass: "col-span-2",
    //   customRender: () => {
    //     return (
    //       values["is_color_price"] == 1 && (
    //         <div className="col-span-">
    //           <ColorPriceFields
    //             name="color_price"
    //             errors={errors}
    //             values={values}
    //             setValues={setValues}
    //           />
    //         </div>
    //       )
    //     );
    //   },
    // },
  ];

  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();

    try {
      if (values.is_color_price == 1) {
        const is_error = setColorPriceError(values, setErrors);
        if (is_error) {
          return;
        }
      }

      const image_error = setImageErrors(values, setErrors);

      if (image_error) {
        return;
      }

      // console.log();

      const api = values.id
        ? editProduct({ ...values } as any)
        : addProduct({ ...values } as any);
      const res = await dispatch(api).unwrap();
      if (deleteFiles.length > 0) {
        await dispatch(deleteFilesApi({ file_urls: deleteFiles })).unwrap();
      }

      console.log("Submitted values:", res);
      if (res.success) {
        router.push("/admin/products");
      }
      // console.log("Mode:", mode);
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
    }
  };

  useEffect(() => {
    listMultiModels("");
    listMultiCategories("");
    listDepartments();
  }, []);

  useEffect(() => {
    if (values.id) {
      listCategoryies({ department_id: values.department_id });
    }
  }, [values.id]);

  return (
    <div className="">
      <DynamicForm
        formClassName="grid grid-cols-2 gap-2"
        submitTitle="Add"
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={
          values.id
            ? [
                formFields[0], // Keep the first field as it is
                {
                  name: "slug",
                  label: "Slug",
                  type: "text",
                  placeholder: "Enter your slug",
                }, // Insert slug at index 1
                ...formFields.slice(1), // Add the remaining fields from index 1 onwards
              ]
            : formFields
        }
        handleSubmit={handleSubmit}
        mode="add"
      />

      <div></div>
    </div>
  );
};

export default AddProduct;
