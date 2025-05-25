"use client";

import React from "react";


interface Column {
  key: string;
  title: string;
  transform?: (value: any, row: any, index: number) => React.ReactNode;
}

interface TableProps {
  apiHit: boolean;
  columns: any[];
  tableData: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ apiHit, columns, tableData }) => {
  return (
    <div className="relative overflow-x-auto scrollbar-minimized overflow-y-auto  border border-gray-200 ">
      <table className="w-full min-h-[150px] text-sm text-center text-gray-500">
        <thead className="text-xs text-black uppercase bg-gray-400  text-lightthemecolor ">
          <tr>
            {columns.map((col, index) => (
              <th scope="col" className="p-2 border border-gray-400" key={index}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiHit && tableData.length > 0 ? (
            tableData.map((row, ind) => (
              <tr
                className="bg-lightthemecolor text-darkthemecolor border hover:bg-gray-50 "
                key={row._id || ind} // Fallback to index if _id is missing
              >
                {columns.map((col, i) => (
                  <td
                    className="p-2 border border-gray-200 whitespace-nowrap text-black font-semibold"
                    key={i}
                  >
                    {col.transform ? col.transform(row[col.key], row, ind) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : apiHit && tableData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Record Found!
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                {/* <Loader /> */}
                Lodding
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
