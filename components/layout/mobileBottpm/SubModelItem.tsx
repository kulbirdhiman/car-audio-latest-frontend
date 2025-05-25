"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { YearItem } from "./YearItem";

export const SubModelList: React.FC<{
  category:any ;
    setOpen: (open: boolean) => void,
  subModels: any[];
  subModelYears: { [key: number]: any[] };
  fetchModelYears: (id: number,model:any) => void;
}> = ({category, subModels, subModelYears, fetchModelYears ,setOpen}) => {
  const [expandedSubModels, setExpandedSubModels] = useState<
    Record<number, boolean>
  >({});

  const toggleSubModel = (subModelId: number,model:any) => {
    setExpandedSubModels((prev) => ({
      ...prev,
      [subModelId]: !prev[subModelId],
    }));
    if (!subModelYears[subModelId]) {
      fetchModelYears(subModelId,model);
    }
  };

  return (
    <motion.div className="ml-6 bg-gray-100 p-3 rounded-md">
      {subModels.length > 0 ? (
        subModels.map((subModel) => (
          <div key={subModel.id} className="mb-1">
            <div
              className="flex items-center justify-between cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md p-2 transition-all duration-300"
              onClick={() => toggleSubModel(subModel.id,subModel)}
            >
              <span className="text-gray-700 font-medium">{subModel.name}</span>
              {expandedSubModels[subModel.id] ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSubModels[subModel.id] && (
              <motion.div className="ml-4 bg-gray-50 rounded-md p-2">
                {subModelYears[subModel.id]?.length > 0 ? (
                  subModelYears[subModel.id].map((year) => (
                    <YearItem category={category} setOpen={setOpen} model={subModel} key={year.id} year={year} />
                  ))
                ) : (
                  <p className="text-gray-500 text-xs p-2">No years found.</p>
                )}
              </motion.div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-xs">No sub-models found.</p>
      )}
    </motion.div>
  );
};
