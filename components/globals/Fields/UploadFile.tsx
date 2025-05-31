"use client";

import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const UploadImage: React.FC<any> = ({
  values,
  setValues,
  customClass,
  index,
  errors,
  isArrayFormat = true,
  deleteFiles,
  setDeleteFiles,
}) => {
  const updateValues = (key: any, value: any) => {
    setValues((prev: any) => {
      const newImages = [...(prev.images || [])];
      newImages[key] = value;
      return { ...prev, images: newImages };
    });
  };

  const handleFileChange = async (event: any) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedFiles = response.data?.data;

      if (Array.isArray(uploadedFiles)) {
        const newImages = uploadedFiles.map((file: any) => ({
          image: file?.key || file?.location,
        }));

        setValues((prev: any) => ({
          ...prev,
          images: [...(prev.images || []), ...newImages],
        }));

        toast.success("Images uploaded successfully");
      } else {
        toast.error("Unexpected response format from upload");
      }
    } catch (error) {
      console.error(error);
      toast.error("Images could not be uploaded");
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(active.id);
    const newIndex = parseInt(over.id);

    const reordered = arrayMove(values.images, oldIndex, newIndex);
    setValues((prev: any) => ({ ...prev, images: reordered }));
  };

  return (
    <div className={customClass ?? ""}>
      <label className="block mt-6 text-lg font-medium">Images</label>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={values.images?.map((_: any, i: number) => i.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-4 auto-rows-[170px] gap-4 mt-4">
            {values.images?.map((img: any, i: number) => (
              <SortableImageCard
                key={i}
                id={i.toString()}
                img={img}
                index={i}
                isMain={i === 0}
                setValues={setValues}
              />
            ))}

            <label className="flex items-center justify-center w-full h-full min-h-[150px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm col-span-1 row-span-1">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
              />
              <PlusIcon className="h-6 w-6 text-gray-500" />
            </label>
          </div>
        </SortableContext>
      </DndContext>

      {errors?.images?.[index] && (
        <p className="text-red-500 mt-2">{errors.images[index]}</p>
      )}

      {values.is_color === "1" && (
        <div className="mt-5">
          <label className="block text-lg font-medium">Color</label>
          <input
            onChange={(e) =>
              updateValues(index, {
                ...values.images[index],
                color: e.target.value,
              })
            }
            className="block w-full border-2 rounded-lg h-10 px-4 py-3 mt-2"
            placeholder="Enter color"
          />
          {errors?.images?.[index]?.color_message && (
            <p className="text-red-500 mt-1">
              {errors.images[index].color_message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;

// Helper component for sortable image card
const SortableImageCard = ({ id, img, index, isMain, setValues }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const src = img?.image?.includes("http")
    ? img.image
    : `${process.env.NEXT_PUBLIC_S3_IMG_URL}${img.image}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group rounded overflow-hidden shadow border bg-gray-100 ${
        isMain ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
    >
      <Image src={src} alt="Uploaded" fill sizes="100%" className="object-cover" />
      <button
        type="button"
        className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full shadow-md p-1 transition"
        onClick={() =>
          setValues((prev: any) => ({
            ...prev,
            images: prev.images.filter((_: any, idx: number) => idx !== index),
          }))
        }
      >
        <MinusIcon className="h-4 w-4 text-red-500" />
      </button>
    </div>
  );
};

// Validator helper (unchanged)
export const setImageErrors = (values: any, setErrors: any) => {
  const newErrors: any = {};
  let is_error = false;
  values.images.forEach((field: any, index: any) => {
    if (!field.image) {
      is_error = true;
      newErrors[index] = "Image is required";
    }
  });

  setErrors((prevValues: any) => ({
    ...prevValues,
    images: newErrors,
  }));

  return is_error;
};
