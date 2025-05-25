"use client";

import React, { useState, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Loader from "./Loader";

const ITEM_TYPE = "ROW";

interface Column {
  key: string;
  title: string;
  transform?: (value: any, row: any, index: number) => React.ReactNode;
}

interface TableProps {
  apiHit: boolean;
  columns: Column[];
  tableData: any;
  setTableData: (data: any) => void;
  updateRowOrderAPI: any;
}

const DraggableRow: React.FC<{
  row: Record<string, any>;
  index: number;
  columns: Column[];
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  dropRow: (dragIndex: number, hoverIndex: number) => void;
}> = ({ row, index, columns, moveRow, dropRow }) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item: { index: number }) {
      dropRow(item.index, index);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={`transition-all duration-200 ease-in-out bg-white border-b hover:bg-blue-50 ${
        isDragging ? "opacity-50 shadow-md" : ""
      }`}
    >
      {columns.map((col, i) => (
        <td
          key={i}
          className="px-4 py-3 text-left whitespace-nowrap text-sm text-gray-700 font-medium border border-gray-200"
        >
          {col.transform
            ? col.transform(row[col.key], row, index)
            : row[col.key]}
        </td>
      ))}
    </tr>
  );
};

const TableWithDnd: React.FC<TableProps> = ({
  apiHit,
  columns,
  tableData,
  setTableData,
  updateRowOrderAPI,
}) => {
  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (dragIndex === hoverIndex) return;
      setTableData((prevTableData: any) => {
        const updatedData = [...prevTableData];
        const [removed] = updatedData.splice(dragIndex, 1);
        updatedData.splice(hoverIndex, 0, removed);
        return updatedData;
      });
    },
    [setTableData]
  );

  const dropRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (dragIndex !== hoverIndex) {
        updateRowOrderAPI(tableData);
      }
    },
    [tableData, updateRowOrderAPI]
  );

  return (
    <div className="relative overflow-x-auto rounded-md  border border-gray-300">
      <table className="w-full text-sm text-gray-600 bg-white">
        <thead className="sticky top-0 bg-gray-100 text-gray-800 border-b border-gray-300 z-10">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold text-sm border-r last:border-r-0"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiHit && tableData.length > 0 ? (
            tableData.map((row: any, index: number) => (
              <DraggableRow
                key={index}
                row={row}
                index={index}
                columns={columns}
                moveRow={moveRow}
                dropRow={dropRow}
              />
            ))
          ) : apiHit && tableData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center px-4 py-6 text-gray-500"
              >
                No records found.
              </td>
            </tr>
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center px-4 py-6"
              >
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithDnd;
