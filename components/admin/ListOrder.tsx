import { orders_colomn } from "@/helpers/tableColumn";
import { getOrder } from "@/store/actions/admin/order";
import { AppDispatch } from "@/store/store";
import Table from "@/components/globals/Table";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../globals/Pagination";

const ListOrder: React.FC<any> = ({ status }) => {
  const [apiHit, setApiHit] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const lostOrders = async (page:any) => {
    try {
      setCurrentPage(page);
      const res = await dispatch(
        getOrder({ status: status, page: page })
      ).unwrap();

      if (res.success) {
        console.log(status, res.data ,"this is data");
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
    lostOrders(1);
  }, [status]);

  return (
    <div>
      <Table
        apiHit={apiHit}
        columns={orders_colomn()} //
        tableData={tableData}
      />
      <Pagination
        totalRecords={totalRecords}
        totalPages={totalPage}
        currentPage={currentPage}
        setCurrentPage={lostOrders}
        limit={10}
        showPagination={showPagination}
        tableDataLength={tableData.length}
      />
    </div>
  );
};

export default ListOrder;
