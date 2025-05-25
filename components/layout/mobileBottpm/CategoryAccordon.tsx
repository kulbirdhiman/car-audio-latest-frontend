"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { detailCategory, getCategories } from "@/store/actions/admin/category";
import { ModelAccordon } from "./ModelAccordon";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Importing loader icon

export const CategoryAccordion: React.FC<{ department: any; setOpen: (open: boolean) => void }> = ({
  department,
  setOpen,
}) => {
  const [openSubCategory, setOpenSubCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [models, setModels] = useState<{ [key: number]: any[] }>({});
  const [loading, setLoading] = useState(true); // Loader state
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    listCategories();
  }, []);

  const listCategories = async () => {
    try {
      setLoading(true); // Start loading
      const res = await dispatch(getCategories({ department_id: department.id })).unwrap();
      if (res.success && res.data.result.length > 0) {
        setCategories(res?.data?.result ?? []);
      } else {
        const params = new URLSearchParams({
          category: department.slug,
        });
        setOpen(false);
        const url = `/product/list?${params.toString()}`;
        router.push(url);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const viewCategory = async (category: any) => {
    try {
      const res = await dispatch(detailCategory({ ...category, slug: category.slug })).unwrap();
      if (res.success) {
        if ((res.data.result as any).car_models.length > 0) {
          setModels((prev) => ({
            ...prev,
            [category.id]: (res.data.result as any)?.car_models ?? [],
          }));
          toggleSubAccordion(category.id);
        } else {
          setOpen(false);
          const params = new URLSearchParams({
            company: category.slug,
          });
          // const url = `/product/list?${params.toString()}`;
                    const url = `/products/${category.slug}`;
          router.push(url);
        }
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  const toggleSubAccordion = (categoryId: number) => {
    setOpenSubCategory(openSubCategory === categoryId ? null : categoryId);
  };

  return (
    <motion.div className="bg-gray-100 p-3 rounded-md mt-2">
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="animate-spin text-blue-500" size={24} />
        </div>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id}>
            <div
              onClick={() => viewCategory(category)}
              className="cursor-pointer p-2 pl-5 flex justify-between items-center text-gray-700 text-sm border-l-4 border-blue-500"
            >
              {category.name}
              {openSubCategory === category.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openSubCategory === category.id && (
              <ModelAccordon setOpen={setOpen} category={category} models={models[category.id] ?? []} />
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-4">
          <p className="text-gray-500 text-sm">No categories available.</p>
        </div>
      )}
    </motion.div>
  );
};
