"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getDepartment } from "@/store/actions/admin/department";
import { CategoryAccordion } from "./CategoryAccordon";

// Component for listing departments
const DepartmentAccordion: React.FC<{ setOpen: (open: boolean) => void ,departments: any[]; }> = ({setOpen,departments}) => {
  const [openMainCategory, setOpenMainCategory] = useState<number | null>(null);
 

  const toggleMainAccordion = (deptId: number) => {
    console.log("lllll");
 
    
    setOpenMainCategory(openMainCategory === deptId ? null : deptId);
  };

  return (
    <div className="w-full max-w-[360px] left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-lg overflow-scroll h-[500px] px-8 absolute bottom-20 p-4">
      {departments.map((dept) => (
        <div key={dept.id} className="mb-2 border-b border-gray-300">
          <div
            onClick={() => toggleMainAccordion(dept.id)}
            className="cursor-pointer p-3 flex justify-between items-center bg-blue-500 text-white rounded-md transition-all hover:bg-blue-600"
          >
            <h3 className="text-lg font-semibold">{dept.name}</h3>
            {openMainCategory === dept.id ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {openMainCategory === dept.id && (
            <CategoryAccordion setOpen={setOpen} department={dept} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DepartmentAccordion;
