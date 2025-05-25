"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { DEPARTMENT_VIEW } from "@/app/constants";
import MegaMenu from "./MegaMenu";
import { getCategories } from "@/store/actions/admin/category";
import { useRouter } from "next/navigation";
import CarProductsDropdown from "../globals/DropDown";

interface HeaderProps {
  data: any[];
  setOpen?: (open: boolean) => void;
}

const ShopMenuHeader: React.FC<HeaderProps> = ({ setOpen, data }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const menuRef = useRef<HTMLDivElement>(null);

  const [megaMenu, setMegaMenu] = useState({
    main: {},
    department: { show: false, data: [] },
    category: { show: false, data: [] },
    model: { show: false, data: [] },
  });

  interface DepartmentRow {
    id: string;
    slug: string;
    name: string;
    search?: boolean;
    [key: string]: any; // if there are additional dynamic fields
  }
  
  interface CategoryResponse {
    success: boolean;
    data: {
      result: any[];
    };
  }
  
  const listCategories = async (row: DepartmentRow): Promise<void> => {
    try {
      const res: CategoryResponse = await dispatch(
        getCategories({ department_id: row.id, ...row })
      ).unwrap();
  
      if (res.success) {
        if (row.search || res?.data?.result.length > 0) {
          setMegaMenu((prev:any) => ({
            ...prev,
            main: row,
            department: { show: true, data: res?.data?.result ?? [] },
            category: { ...prev.category },
            model: { ...prev.model },
          }));
        } else {
          router.push(`/products/?category=${row.slug}`);
          setMegaMenu({
            main: {},
            department: { show: false, data: [] },
            category: { show: false, data: [] },
            model: { show: false, data: [] },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMegaMenu({
          main: {},
          department: { show: false, data: [] },
          category: { show: false, data: [] },
          model: { show: false, data: [] },
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative z-30 mt-0">
      <div className="w-full px-3 hidden md:flex items-center bg-gray dark:bg-white ">
              <CarProductsDropdown />

        {data.map((dept, index) =>
          dept.is_view === DEPARTMENT_VIEW.YES ? (
            <button
              key={`${dept.slug}-${index}`}
              onClick={() => listCategories(dept)}
              className="px-3 py-2 text-amazon_light md:text-xs xl:text-sm line-clamp-1 font-medium hover:bg-gray-100 transition duration-150 cursor-pointer ease-in-out flex items-center gap-1 rounded"
            >
              {dept.name}
              {/* <MdArrowDropDown className="text-lg" /> */}
            </button>
          ) : null
        )}
      </div>

      {megaMenu.department.show && (
        <MegaMenu
          title="Kayhan Audio"
          position={{ top: "50px" }}
          link="/departments"
          setMegaMenu={setMegaMenu}
          data={megaMenu.department.data}
          megaMenuData={megaMenu}
          getData={listCategories}
        />
      )}

      {megaMenu.category.show && (
        <MegaMenu
          title="Kayhan Audio"
          position={{ top: "50px" }}
          link="/departments"
          setMegaMenu={setMegaMenu}
          data={megaMenu.category.data}
          megaMenuData={megaMenu}
          getData={listCategories}
        />
      )}

      {megaMenu.model.show && (
        <MegaMenu
          title="Kayhan Audio"
          position={{ top: "50px" }}
          link="/departments"
          setMegaMenu={setMegaMenu}
          data={megaMenu.model.data}
          megaMenuData={megaMenu}
          getData={listCategories}
        />
      )}
    </div>
  );
};

export default ShopMenuHeader;
