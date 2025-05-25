import React, { useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import RightDrawerForm from "../globals/RightDrawerForm";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  SHIPPMENT_METHOD,
  SHIPPMENT_TYPE,
  STANDARD_DELIVERY,
} from "@/app/constants";
import UpdateOrderFields from "../globals/Fields/UpdateOrderFields";
import OrderUpdate from "./OrderUpdate";
import { calculatePrice } from "@/store/actions/cart";
import { printlabel } from "@/store/actions/admin/order";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const OrderDetail: React.FC<any> = ({ order, viewDetail }) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  if (!order) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading order details...
      </div>
    );
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };
 

  const dispatch = useDispatch<AppDispatch>();
  const labelPrint = async () => {
    try {
      const api = printlabel({ cannot: (order as any).tracking_number });
      const res = await dispatch(api).unwrap();
 
      if ((res.data.result as any).LabelURL) {
        const link = document.createElement("a");
        link.href = (res.data.result as any).LabelURL;
        link.download = "file"; // You can specify a filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    
      // console.log("Mode:", mode);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl font-serif">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold font-serif mb-6 text-gray-800">
          Order Details
        </h1>
        <div className="flex gap-2 h-10 items-center">
          {order.shippment_method ==
            SHIPPMENT_METHOD.direct_freight_express && (
            <button
              onClick={labelPrint}
              className="text-white bg-blue-600 p-2 shadow-lg rounded-lg float-right"
            >
              Print Label
            </button>
          )}

          <button
            onClick={toggleDrawer}
            className="text-white bg-blue-600 p-2 shadow-lg rounded-lg float-right"
          >
            Update order
          </button>
        </div>
      </div>

      <OrderUpdate
        viewDetail={viewDetail}
        toggleDrawer={toggleDrawer}
        order={order}
        setOpen={setOpen}
        open={open}
      />

      {/* Order Information */}
      <div className="bg-white shadow rounded-lg p-4 my-4 mx-3">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Customer Information */}
          <div className="flex-1 min-w-[150px]">
            <h3 className="text-sm font-semibold border-b pb-2 mb-2">
              Customer Information
            </h3>
            <div className="text-xs space-y-1">
              <p>
                <span className="font-semibold">First Name:</span>{" "}
                {order?.user_detail?.name}
              </p>
              <p>
                <span className="font-semibold">Last Name:</span>{" "}
                {order?.user_detail?.last_name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {order?.user_detail?.name}
              </p>
              <p>
                <span className="font-semibold">Phone number:</span>{" "}
                {order?.user_detail?.phone}
              </p>
            </div>
          </div>

          {/* Billing Address */}
          <div className="flex">
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-sm font-semibold border-b pb-2 mb-2">
                Billing Address
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>{order?.billing_address?.street_address}</p>
                <p>
                  {order?.billing_address?.city},{" "}
                  {order?.billing_address?.state.name},
                  {order?.billing_address?.country?.name}{" "}
                </p>
                <p> {order?.billing_address?.postcode}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-sm font-semibold border-b pb-2 mb-2">
                Shipping Address
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>{order?.shipping_address?.street_address}</p>
                <p>
                  {order?.shipping_address?.city},{" "}
                  {order?.shipping_address?.state.name},
                  {order?.shipping_address?.country?.name}{" "}
                </p>
                <p> {order?.shipping_address?.postcode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="my-3 px-4 borders-b border-sblack gap-3 flex  text-sm font-serif">
        <div>
        <span className="font-bold">Order no :</span> #{order.id}
        </div>
        <div>
        <span className="font-bold">Selected Shipmen :</span>      {order.selected_shipment == STANDARD_DELIVERY ?
          order.payment_status == PAYMENT_STATUS.paid &&
          "Standard delivery" : "Local Pickup"}
        </div>

<div>
<span className="font-bold"> Order Status :</span> 
        {order.status == ORDER_STATUS.canceled &&
          order.payment_status == PAYMENT_STATUS.paid &&
          "Cancel"}
        {order.status == ORDER_STATUS.shipped &&
          order.payment_status == PAYMENT_STATUS.paid &&
          "Shipped"}
        {order.status == ORDER_STATUS.delivered &&
          order.payment_status == PAYMENT_STATUS.paid &&
          "Delivered"}
        {order.status == ORDER_STATUS.processing &&
          order.payment_status == PAYMENT_STATUS.paid &&
          "Processing"}
        {order.status == ORDER_STATUS.trashed &&
          order.payment_status == PAYMENT_STATUS.paid &&
          "Trashed"}
        {order.status == ORDER_STATUS.returned &&
          order.payment_status == PAYMENT_STATUS.paid &&
          "Refunded"}
        {order.payment_status == PAYMENT_STATUS.pending && "Payment Failed"}
</div>
   
      </p>
      {/* <OrderStatusTracker order={order} status={order.shipped_at || order.delivered_at || "placed"}  /> */}

      <div className="w-full flex flex-wrap gap-2 my-3">
        {order?.products?.map((row:any, i:any) => (
          <div
            key={i}
            className="w-full sm:w-[48%] h-[230px] border rounded-lg p-4 shadow-lg"
          >
            <h3 className="md:text-sm lg:text-lg font-semibold my-3">
              {row.name}
            </h3>

            {/* Display Variations */}
            <div className="text-gray-600 flex flex-wrap gap-3 text-sm font-serif">
              {row?.variations?.map((variation:any, vIndex:any) => (
                <span key={vIndex}>{variation.name}</span>
              ))}

              {/* If 'options' is inside each variation */}
              {row?.variations?.map((variation:any) =>
                variation?.options?.map((option:any, oIndex:any) => (
                  <span key={oIndex}>{option.name}</span>
                ))
              )}
            </div>

            <p>
              Price :
              <span className="font-sans font-semibold">
                {calculatePrice(row)}
              </span>
            </p>
            <p>
              Quantity :
              <span className="font-sans font-semibold">{row.quantity}</span>
            </p>
            {/* Customer Info */}
          </div>
        ))}
      </div>
      <OrderSummaryCard
        shippingcharge={order?.shipping_charge}
        trackingNumber={order?.tracking_number}
        subtotal={order?.sub_total}
        coupenDiscount={order?.coupen_discount}
        total={order?.total_paid_value}
        giftCardDiscount={order?.gift_card_discount}
      />
    </div>
  );
};

export default OrderDetail;
// import React from "react";

const OrderStatusTracker: React.FC<any> = ({ status, order }) => {
  const steps = [
    {
      id: ORDER_STATUS.processing,
      name: "Order Placed",
      key: "placed",
      icon: CheckCircleIcon,
    },
    {
      id: ORDER_STATUS.shipped,
      name: "Shipped",
      key: "shipped",
      icon: TruckIcon,
    },
    { id: 5, name: "Delivered", key: "delivered", icon: CheckCircleIcon },
    { id: 6, name: "Cancelled", key: "cancelled", icon: XCircleIcon },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === status);
  const isCancelled = status === "cancelled";

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const StepIcon = step.icon;

          const isCompleted = index <= currentStepIndex && !isCancelled;
          const isCurrent = index === currentStepIndex && !isCancelled;
          const isDisabled = isCancelled && index > currentStepIndex;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Line Connector */}
              {index !== 0 && (
                <div
                  className={`absolute top-5 left-0 w-full h-[2px] ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{ zIndex: 0 }}
                />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isDisabled
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-500"
                  }`}
              >
                <StepIcon className="w-5 h-5" />
              </div>

              {/* Status Text */}
              <p
                className={`mt-1 text-xs text-center font-medium ${
                  isCompleted
                    ? "text-green-600"
                    : isCurrent
                    ? "text-blue-600"
                    : isDisabled
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const OrderSummaryCard : React.FC<any>= ({
  shippingcharge,
  trackingNumber,
  giftCardDiscount,
  subtotal,
  coupenDiscount,
  total,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Tracking No :</span>
          <span className="font-medium">{trackingNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal?.toFixed(2) || "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>gift card discount:</span>
          <span className="font-medium text-red-500">
            -${giftCardDiscount?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Coupen discount:</span>
          <span className="font-medium text-red-500">
            -${coupenDiscount?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Charge:</span>
          <span className="font-medium">
            ${shippingcharge?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold text-base">
          <span>Total:</span>
          <span>${total?.toFixed(2) || "0.00"}</span>
        </div>
      </div>
    </div>
  );
};
