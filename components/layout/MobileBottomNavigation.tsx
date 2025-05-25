"use client";

import { ShoppingCartIcon, ArchiveBoxIcon, HeartIcon, HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainCategoryAccordion from "./mobileBottpm/DeptAccordon";
import { getDepartment } from "@/store/actions/admin/department";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { FaBox } from "react-icons/fa";
interface HeaderProps {
  departments: any[];
 
}

const MobileBottomNavigation: React.FC<HeaderProps> = ({departments}) => {

  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  // const [departments, setDepartments] = useState<any[]>([]);

  
  
    const listDepartments = async () => {
      try {
        const res = await dispatch(getDepartment({})).unwrap();
        if (res.success && res.data.result.length > 0 ) {
          // setDepartments(res?.data?.result ?? []);
        }else{
        
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

  return (
    <div
      className="fixed bottom-0 w-full z-[1900] lg:hidden bg-white py-1 shadow-md border-t border-gray-200"
    >
      <div className="flex justify-between items-center w-10/12 mx-auto text-xs font-medium text-gray-700">
        <Link href="/" className="flex flex-col items-center gap-1">
          <HomeIcon className="w-6 h-6" />
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1">
          <HeartIcon className="w-6 h-6" />
        </Link>
        <div onClick={() => setOpen(!open)} className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer">
          <Bars3Icon className="w-7 h-7 text-gray-700" />
        </div>
        <Link href="/shopping-cart" className="flex flex-col  items-center gap-1">
          <ShoppingCartIcon className="w-6 h-6" />
        </Link>
        <Link href="/user/orders" className="flex flex-col items-center gap-1">
          <FaBox className="w-6 h-6" />
        </Link>
      </div>
      {open && <MainCategoryAccordion departments={departments} setOpen={setOpen} />}
    </div>
  );
};

export default MobileBottomNavigation;
