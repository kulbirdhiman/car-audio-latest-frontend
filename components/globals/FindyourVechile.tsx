"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getCategories, detailCategory } from "@/store/actions/admin/category";
import { CATEGORY_TYPE } from "@/app/constants";
import { detailCarModel } from "@/store/actions/admin/carModel";

const VehicleSelector = () => {
  const [make, setMake] = useState<any>("");
  const [model, setModel] = useState<any>("");
  const [year, setYear] = useState<any>("");

  const [years, setYears] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [loadingMakes, setLoadingMakes] = useState<boolean>(true);
  const [loadingModels, setLoadingModels] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await dispatch(
          getCategories({ limit: 10000000, type: CATEGORY_TYPE.company })
        ).unwrap();
        setCategories(res.data.result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingMakes(false);
      }
    };
    fetchMakes();
  }, [dispatch]);

  const fetchModels = async (selectedMakeId: any) => {
    setLoadingModels(true);
    setModels([]);
    const category = categories.find((cat) => cat.id == selectedMakeId);

    if (!category) {
      setLoadingModels(false);
      return;
    }

    setMake(category);

    try {
      const res = await dispatch(
        detailCategory({ slug: category.slug })
      ).unwrap();

      if (res.success) {
        const options =
          (res.data.result as any).car_models?.map((row: any) => ({
            value: row.id,
            label: row.name,
            slug: row.slug,
          })) || [];
        setModels(options);

        // Redirect if no models
        if (options.length === 0) {
          router.push(`/products/${category.slug}`);
        }
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoadingModels(false);
    }
  };

  const fetchYears = async (selectedModelId: any) => {
    const selectedModel = models.find((m) => m.value == selectedModelId);
    if (!selectedModel) return;

    setModel(selectedModel);
    try {
      const res = await dispatch(detailCarModel({ id: selectedModelId })).unwrap();
      if (res.success) {
        const fetchedYears = res.data.result;
        setYears(fetchedYears);

        // Redirect if no years
        if (make && selectedModel && (!fetchedYears || fetchedYears.length === 0)) {
          router.push(`/products/${make.slug}/${selectedModel.slug}`);
        }
      }
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const handleMakeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMakeId = e.target.value;
    setModel("");
    setYear("");
    setYears([]);
    await fetchModels(selectedMakeId);
  };

  const handleModelChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedModelId = e.target.value;
    setYear("");
    setYears([]);
    await fetchYears(selectedModelId);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);

    if (make && model && selectedYear) {
      router.push(`/products/${make.slug}/${model.slug}/${selectedYear}`);
    }
  };

  return (
    <div
      className="min-h-[110vh] flex flex-col items-center justify-center bg-gray-900 text-white relative px-6"
      style={{
        backgroundImage: "url('/find.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="space-y-4 flex flex-col justify-center items-center relative">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center">
          Find What Fits Your Vehicle
        </h2>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {/* Make */}
          <select
            className="block w-[11rem] sm:w-[14rem] p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm mt-4 focus:ring-2 focus:ring-blue-500"
            value={make?.id || ""}
            onChange={handleMakeChange}
            disabled={loadingMakes || categories.length === 0}
          >
            <option value="" disabled>
              Select Your Make
            </option>
            {categories.map((makeOption, index) => (
              <option key={index} value={makeOption.id}>
                {makeOption.name}
              </option>
            ))}
          </select>

          {/* Model */}
          <select
            className="block w-[11rem] sm:w-[14rem] p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm mt-4 focus:ring-2 focus:ring-blue-500"
            value={model?.value || ""}
            onChange={handleModelChange}
            disabled={loadingModels || models.length === 0}
          >
            <option value="" disabled>
              Select Your Model
            </option>
            {models.map((modelOption) => (
              <option key={modelOption.value} value={modelOption.value}>
                {modelOption.label}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            className="block w-[11rem] sm:w-[14rem] p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm mt-4 focus:ring-2 focus:ring-blue-500"
            value={year || ""}
            onChange={handleYearChange}
            disabled={!years.length}
          >
            <option value="">Select Year</option>
            {years.map((yearOption, index) => (
              <option key={index} value={yearOption.id}>
                {yearOption.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;
