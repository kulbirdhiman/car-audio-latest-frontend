"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { detailCategory } from "@/store/actions/admin/category";
import { detailCarModel } from "@/store/actions/admin/carModel";
import { SubModelList } from "./SubModelItem";
import { YearItem } from "./YearItem";
import { useRouter } from "next/navigation";
 
export const ModelAccordon: React.FC<{ models: any[]; category: any,setOpen: (open: boolean) => void }> = ({
  models,
  category,
  setOpen
}) => {

     const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [subModels, setSubModels] = useState<{ [key: number]: any[] }>({});
  const [subModelYears, setSubModelYears] = useState<{ [key: number]: any[] }>({});

  const toggleItem = async (itemId: number,model:any) => {
    try {
      const res = await dispatch(
        detailCategory({ ...category, model_id: itemId })
      ).unwrap();
      if (res.success) {
        const carModels = (res.data.result as any)?.car_models || [];
        if (carModels.length > 0) {
          setExpandedItems((prev) => ({ [itemId]: !prev[itemId], type: "sub" }));
          setSubModels((prev) => ({ ...prev, [itemId]: carModels }));
        } else {
          setExpandedItems((prev) => ({ [itemId]: !prev[itemId], type: "year" }));
          fetchModelYears(itemId,model);
        }
      }
    } catch (error) {
      console.error("Error fetching category or model details:", error);
    }
  };

  const fetchModelYears = async (modelId: number,model:any) => {
    try {
      const carModelRes = await dispatch(detailCarModel({ id: modelId })).unwrap();
      if (carModelRes.success) {
        setSubModelYears((prev) => ({
          ...prev,
          [modelId]: carModelRes.data.result,
        }));
      }else{
        setOpen(false)
        const params = new URLSearchParams({
          company: category.slug,
          model:model.slug
        });
        // const url = `/product/list?${params.toString()}`;
        const url = `/products/${category.slug}/${model.slug}`;
 
        router.push(url);
      }
    } catch (error) {
      console.error("Error fetching model years:", error);
    }
  };

  return (
    <motion.div className="bg-white shadow-md rounded-lg p-4">
      {models.length > 0 ? (
        models.map((model) => (
          <div key={model.id} className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md p-3 transition-all duration-300"
              onClick={() => toggleItem(model.id,model)}
            >
              <span className="font-medium text-gray-800">{model.name}</span>
              {expandedItems[model.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {expandedItems[model.id] && (expandedItems as any).type == "sub" && (
              <SubModelList category={category} setOpen={setOpen} subModels={subModels[model.id] || []} subModelYears={subModelYears} fetchModelYears={fetchModelYears} />
            )}

            {expandedItems[model.id] && (expandedItems as any).type == "year" && (
              <motion.div className="ml-6 bg-gray-50 rounded-md p-3">
                {subModelYears[model.id]?.length > 0 ? (
                  subModelYears[model.id].map((year) => <YearItem  category={category} setOpen={setOpen} model={model} key={year.id} year={year} />)
                ) : (
                  <p className="text-gray-500 text-sm">No years found.</p>
                )}
              </motion.div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No models found.</p>
      )}
    </motion.div>
  );
};
