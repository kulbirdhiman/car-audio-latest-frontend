"use client";

import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getCategories } from "@/store/actions/admin/category";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBagIcon, TagIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface MenuBarDetailProps {
  selectedItem: any[];
  toggleDrawer: (open: boolean) => void;
  setDetailsOpen: (open: boolean) => void;
}

const MenuBarDetail: React.FC<MenuBarDetailProps> = ({
  selectedItem = [],
  toggleDrawer,
  setDetailsOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [currentDepartment, setCurrentDepartment] = useState<any | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async (department: any) => {
    setLoading(true);
    setError(null);
    setCurrentDepartment(department);
    setCategories([]);

    try {
      const res = await dispatch(
        getCategories({ department_id: department.id })
      ).unwrap();

      if (res.success) {
        setCategories(res.data.result ?? []);
      } else {
        setError("Failed to load categories.");
      }
    } catch (error) {
      setError("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentDepartment(null);
    setCategories([]);
    setError(null);
  };

  const handleCategoryClick = (category: any) => {
    if (currentDepartment) {
      const params = new URLSearchParams({
        company: category.slug,  
      });
  
      const url = `/products/${category.slug}`;
  
      toggleDrawer(false);
      router.push(url); // Navigate to /product/list with ?company=xxx
    }
  };
  
  

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "tag":
        return <TagIcon className="h-5 w-5 text-gray-500" />;
      case "bag":
        return <ShoppingBagIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <ShoppingBagIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-[320px] h-screen scrollbar-minimized overflow-y-scroll bg-gradient-to-b from-white to-gray-50 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-white shadow">
        <button
          onClick={() =>
            currentDepartment ? handleBack() : setDetailsOpen(false)
          }
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {currentDepartment ? currentDepartment.name : "All Categories"}
        </h2>
      </div>

      {/* Main Content */}
      <div className="py-4 pb-10">
        <AnimatePresence mode="wait">
          {currentDepartment ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.1 }}
              className="space-y-2"
            >
              {loading ? (
                <div className="flex justify-center items-center py-6">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <p className="px-4 text-sm text-red-500">{error}</p>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <motion.div
                    key={category.id}
                    className="flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-100 border border-gray-200 cursor-pointer rounded-lg transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="flex items-center gap-3">
                      {renderIcon(category.icon)}
                      <span className="text-sm text-gray-800 font-medium">
                        {category.name}
                      </span>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </motion.div>
                ))
              ) : (
                <p className="px-4 text-sm text-gray-500">No categories found.</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="departments"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {selectedItem.map((item) => (
                <motion.div
                  key={item.id}
                  onClick={() => fetchCategories(item)}
                  className="flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-100 border border-gray-200 cursor-pointer rounded-lg transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    {renderIcon(item.icon)}
                    <p className="text-sm text-gray-800 font-medium">
                      {item.name}
                    </p>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuBarDetail;
