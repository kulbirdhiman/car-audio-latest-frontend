"use client";
import { useEffect, useState } from 'react';
import { getcarDepartment } from "@/store/actions/admin/department";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

const CarProductsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const listDepartments = async () => {
    try {
      const res = await dispatch(getcarDepartment({})).unwrap();
      if (res.success) {
        setData(res?.data?.result ?? []);
        console.log("Car Products:", res?.data?.result);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    listDepartments();
  }, []);

  return (
    <li className="relative">
      <button
        onClick={toggleDropdown}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
      >
        Car Products
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md z-50">
          {data.length > 0 ? (
            data.map((item) => (
              <li key={item.id}>
                <a
                  href={`/find-your-vechile`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  {item.name}
                </a>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </li>
  );
};

export default CarProductsDropdown;
