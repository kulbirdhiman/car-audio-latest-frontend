import React, { useState } from "react";
import RightDrawerForm from "../globals/RightDrawerForm";
import UpdateOrderFields from "../globals/Fields/UpdateOrderFields";
import { ORDER_STATUS, STANDARD_DELIVERY } from "@/app/constants";
import { updateOrder } from "@/store/actions/admin/order";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { mapServerErrors } from "@/helpers/commonFunction";

const OrderUpdate: React.FC<any> = ({ setOpen, viewDetail, open, order, toggleDrawer }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (
    e: React.FormEvent,
    values: Record<string, any>,
    mode: string
  ) => {
    e.preventDefault();

    try {
      const api = updateOrder({ ...values, id: order.id });
      const res = await dispatch(api).unwrap();
      console.log("res",(res.data.result as any).labelUrl);
      

      viewDetail();
      toggleDrawer();

      // console.log("Mode:", mode);
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
    }
  };

  return (
    <>
      <RightDrawerForm
        title={"ShippOrder"}
        open={open}
        toggleDrawer={toggleDrawer}
        values={values}
        setValues={setValues}
        errors={errors}
        formFields={getStatusUpdateField(values, setValues,order)}
        handleSubmit={handleSubmit}
        submitTitle="Submit"
      />
    </>
  );
};

export default OrderUpdate;

export const getStatusUpdateField = (values: any, setValues: any,order:any) => {
  return [
    {
      name: "status",
      type: "select",
      label: "Select Status",
      placeholder: "Enter title...",
      options: [
        ...(order.selected_shipment == STANDARD_DELIVERY
          ? [{ value: ORDER_STATUS.shipped, label: "Shipped" }]
          : []),
        { value: ORDER_STATUS.canceled, label: "Cancel" },

        { value: ORDER_STATUS.delivered, label: "Delivered" },

        { value: ORDER_STATUS.returned, label: "Returned" },

        { value: ORDER_STATUS.trashed, label: "Trashed" },
      ],
    },
    {
      name: "custom",
      label: "custom",
      type: "custom",
      customRender: () => {
        return <UpdateOrderFields values={values} setValues={setValues} />;
      },
    },
    {
      name: "remarks",
      type: "textarea",
      label: "Remarks",
      placeholder: "Enter remarks...",
    },
  ];
};
