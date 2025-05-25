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
  className="min-h-[85vh] flex flex-col items-center justify-center relative px-4 sm:px-8 py-20 text-white"
  style={{
    backgroundImage: "url('/find.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70 backdrop-blur-xs"></div>

  {/* Heading */}
  <div className="relative z-10 text-center mb-12">
    <h2 className="text-4xl sm:text-5xl font-bold font-serif mb-3">
      Customize Your Steering Wheel
    </h2>
    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
      Build a wheel that fits your vehicle and style perfectly.
    </p>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
    {/* Left: Features */}
    <div className="bg-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-lg text-left">
      <h3 className="text-2xl font-semibold mb-4">Why Customize?</h3>
      <ul className="space-y-4 list-none">
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 mt-2 bg-blue-500 rounded-full"></span>
          <span className="text-lg text-gray-200">Choose your stitch cover</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 mt-2 bg-blue-500 rounded-full"></span>
          <span className="text-lg text-gray-200">Select your leather cover</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 mt-2 bg-blue-500 rounded-full"></span>
          <span className="text-lg text-gray-200">Define your center line</span>
        </li>
      </ul>
    </div>

    {/* Right: Form */}
    <div className="bg-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-lg">
      <h3 className="text-2xl font-semibold mb-6">Select Your Vehicle</h3>

      {/* Make Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-200">Make</label>
        <select
          className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
          value={make?.id || ""}
          onChange={handleMakeChange}
          disabled={loadingMakes || categories.length === 0}
        >
          <option value="" disabled>
            Select Make
          </option>
          {categories.map((makeOption, index) => (
            <option key={index} value={makeOption.id}>
              {makeOption.name}
            </option>
          ))}
        </select>
      </div>

      {/* Model Dropdown */}
      {make?.id && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-200">Model</label>
          <select
            className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
            value={model?.value || ""}
            onChange={handleModelChange}
            disabled={loadingModels || models.length === 0}
          >
            <option value="" disabled>
              Select Model
            </option>
            {models.map((modelOption) => (
              <option key={modelOption.value} value={modelOption.value}>
                {modelOption.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Year Dropdown */}
      {model?.value && (
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">Year</label>
          <select
            className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
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
      )}
    </div>
  </div>
</div>

);

};

export default VehicleSelector;
