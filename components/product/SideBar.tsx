"use client";
import React, { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getDepartment } from "@/store/actions/admin/department";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
// import { DEPARTMENT_VIEW } from "@/app/constants";
import { motion, AnimatePresence } from "framer-motion";
interface Department {
  id: string;
  slug: string;
  name: string;
}

interface SideBarProps {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
  list: (page: number, searchParams: URLSearchParams, searchTerm: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ showSideBar,  list }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramList = (useParams()?.slug as string[]) || [];

  const company = paramList[0] || "";
  const model = paramList[1] || "";
  const year = paramList[2] || "";
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    setSelectedDepartment(categoryParam || null);
    const fetchDepartments = async () => {
      try {
        const res = await dispatch(getDepartment({})).unwrap();
        if (res.success) setDepartments((res?.data as any)?.result ?? []);
      } catch (error) {
        console.error("Department fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, [dispatch, categoryParam]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      list(1, searchParams, searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // const removeFilter = (key: string) => {
  //   const newParams = new URLSearchParams(searchParams.toString());
  //   console.log(newParams,"this is keys")
  //   newParams.delete(key);
  //   console.log(`${newParams.delete(key)} check this is working`)
  //   router.push(`${pathname}?${newParams.toString()}`);
  // };

  const handleClearFilters = () => {
    setSelectedDepartment(null);
    router.push("/products");
  };

  const handleDepartmentClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedDepartment === slug) {
      params.delete("category");
      setSelectedDepartment(null);
    } else {
      params.set("category", slug);
      setSelectedDepartment(slug);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // const renderChips = () => {
  //   const chips = [
  //     { key: "company", value: company },
  //     { key: "model", value: model },
  //     { key: "year", value: year },
  //   ].filter(chip => chip.value);

  //   if (!chips.length) return null;

  //   return (
  //     <div className="flex gap-3 overflow-x-auto bg-white my-2 p-2">
  //       {chips.map(({ key, value }) => (
  //         <button
  //           key={key}
  //           onClick={() => removeFilter(key)}
  //           className="flex items-center whitespace-nowrap px-3 py-1 bg-gray-600 rounded-full text-white"
  //         >
  //           {value}
  //           <FaTimes size={14} className="ml-2" />
  //         </button>
  //       ))}
  //     </div>
  //   );
  // };

  const renderSidebarContent = () => (
    <>
      {/* {renderChips()} */}
      <ul className="space-y-2 mt-3">
        <motion.li
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2"
          onClick={handleClearFilters}
        >
          <input
            type="radio"
            checked={!selectedDepartment}
            onChange={handleClearFilters}
            className="w-4 h-4 accent-blue-500"
          />
          <span className={`text-sm ${!selectedDepartment ? "font-medium text-blue-600" : "text-gray-800"}`}>
            All
          </span>
        </motion.li>

        {loading ? (
          <p className="text-sm text-gray-500">Loading departments...</p>
        ) : departments.length > 0 ? (
          departments.map(dep => (
            <motion.li
              whileTap={{ scale: 0.95 }}
              key={dep.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2"
              onClick={() => handleDepartmentClick(dep.slug)}
            >
              <input
                type="radio"
                checked={selectedDepartment === dep.slug}
                onChange={() => handleDepartmentClick(dep.slug)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className={`text-sm ${selectedDepartment === dep.slug ? "font-medium text-blue-600" : "text-gray-800"}`}>
                {dep.name}
              </span>
            </motion.li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No departments found.</p>
        )}
      </ul>
    </>
  );

  return (
    <>
      {/* Mobile filter button */}
      <button
        className="lg:hidden fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsMobileOpen(true)}
      >
        <Filter />
      </button>

      {/* Desktop Sidebar */}
      <aside className={`${showSideBar ? "md:block" : "hidden"} absolute z-20 lg:relative lg:block bg-white p-5 space-y-4 h-full overflow-y-auto`}>
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white shadow-lg w-3/4 sm:w-1/2 h-full p-5 overflow-y-auto"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
              aria-label="Close Filters"
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
            {renderSidebarContent()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
