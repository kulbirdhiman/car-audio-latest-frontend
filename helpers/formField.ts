//   add department
"use client"
import { CATEGORY_TYPE, DEPARTMENT_VIEW ,is_car_product } from "@/app/constants";

export const department_fields = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter Name...",
  },
  {
    name: "is_view",
    type: "radio",
    label: "Department view",
    placeholder: "Enter description...",
    options: [
      { value: DEPARTMENT_VIEW.YES, label: "Department show on menu bar" },

      {
        value: DEPARTMENT_VIEW.NO,
        label: "Department not showing on menu bar",
      },
    ],
  },
  {
    name: "is_car_product",
    type: "radio",
    label: "is_car_product",
    placeholder: "Enter description...",
    options: [
      { value: is_car_product.YES, label: "yes" },

      {
        value: is_car_product.NO,
        label: "no",
      },
    ],
  },
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter title...",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description...",
  },
];

export const getCategoryFields = (departmentOptions: any[] = []) => {
  return [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name...",
    },
    {
      name: "department_ids",
      type: "select",
      label: "Select Departments",
      placeholder: "Enter title...",
      options: departmentOptions,
      isMultiple: true,
    },
    {
      name: "type",
      type: "radio",
      label: "Type",
      placeholder: "Enter description...",
      options: [
        { value: CATEGORY_TYPE.company, label: "Company" },

        { value: CATEGORY_TYPE.other, label: "Other" },
      ],
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Enter title...",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter description...",
    },
  ];
};

export const getCarModelFields = (
   parentModelsOptions: any[] = []
) => {
  return [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name...",
    },
   
    {
      name: "parent_id",
      type: "select",
      label: "Select Parent Model",
      placeholder: "Enter title...",
      options: parentModelsOptions,
    },

    {
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Enter title...",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter description...",
    },
  ];
};





