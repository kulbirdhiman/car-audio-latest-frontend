"use client";
import React, { useEffect, useState } from "react";
import DynamicForm, { FormField } from "@/components/globals/DynamicForm";
import { getDepartment } from "@/store/actions/admin/department";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
 
import { detailCategory, getCategories } from "@/store/actions/admin/category";
import YearRangePicker from "../globals/Fields/YearRangePicker";
import   { setImageErrors } from "../globals/Fields/UploadFile";
import UploadImage from "../globals/Fields/UploadFile";
import ColorPriceFields, {
  setColorPriceError,
} from "../globals/Fields/ColorPrice";
import { addProduct, editProduct } from "@/store/actions/admin/product";
import { mapServerErrors } from "@/helpers/commonFunction";
import { useRouter } from "next/navigation";

const AddOnForm: React.FC<any> = ({ values, setValues }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  

  const [errors, setErrors] = useState<Record<string, any>>({});
  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

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

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your email",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter your Title",
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
      label: "Regular Priice",
      type: "number",
      placeholder: "Enter quantity",
    },
    {
      name: "discount_price",
      label: "Discount Priice",
      type: "number",
      placeholder: "Enter Discount price",
    },
    {
      name: "wholesale_price",
      label: "Wholesale Priice",
      type: "number",
      placeholder: "Enter Wholesale price",
    },
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
      name: "images",
      label: "Upload Images",
      type: "custom",
      customClass: "col-span-2",
      customRender: () => {
        return (
          <div className="col-span-2">
            {/* {values.images.map((image, i) => (
              <UploadImage
                customClass="col-span-2"
                values={values}
                index={i}
                setValues={setValues}
                errors={errors}
                key={i}
              />
            ))} */}
          </div>
        );
      },
    },

    {
      name: "is_color_price",
      label: "Colour or not",
      type: "select",
      options: COLOR_VALIDATION,
      placeholder: "Enter quantity",
      customChange: handleSelectChange,
    },
    {
      name: "color_price",
      label: "Fill Colors",
      type: "custom",
      customClass: "col-span-2",
      customRender: () => {
        return (
          values["is_color_price"] == 1 && (
            <div className="col-span-">
              <ColorPriceFields
                name="color_price"
                errors={errors}
                values={values}
                setValues={setValues}
              />
            </div>
          )
        );
      },
    },
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
      console.log("llllllllll");

      const image_error = setImageErrors(values, setErrors);

      if (image_error) {
        return;
      }

      // console.log();

      const api = values.id
        ? editProduct({ ...values } as any)
        : addProduct({ ...values } as any);
      const res = await dispatch(api).unwrap();

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

export default AddOnForm;
