"use client";
import React, { useEffect, useState } from "react";
import OrderDetail from "@/components/admin/OrderDetail";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getOrderDetail } from "@/store/actions/admin/order";
import { useParams } from "next/navigation";
const page = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [apiHit, setApiHit] = useState(false);

  

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const viewDetail = async () => {
    try {
      const res = await dispatch(getOrderDetail({ id: params.id })).unwrap();

      if (res.success) {
        console.log(res);
        setApiHit(true);
        setOrderDetail((res.data as any).result);
        console.log("detail", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewDetail();
  }, []);

  return (
    <div>
      <OrderDetail viewDetail={viewDetail} order={orderDetail} />
    </div>
  );
};

export default page;
