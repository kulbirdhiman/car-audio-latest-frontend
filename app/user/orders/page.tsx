"use client";

import Table from '@/components/globals/Table';
import { my_orders_colomn } from '@/helpers/tableColumn';
import { getMyOrders } from '@/store/actions/user/orders';
import { AppDispatch } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [apiHit, setApiHit] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getMyOrders({})).unwrap();
      if (res.success) {
        setData(res.data.result);
        setApiHit(true);
        console.log(`this is order data ${data}`)
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage your previous orders</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : data.length > 0 ? (
            <Table apiHit={apiHit} columns={my_orders_colomn()} tableData={data} />
          ) : (
            <div className="text-center py-20 text-gray-500">
              You have no orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
