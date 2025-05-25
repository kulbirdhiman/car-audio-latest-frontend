"use client";
import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

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
    console.log(value, "this is image data");

    setValues((prev: any) => {
      const newImages = [...(prev.images || [])];
      newImages[key] = value;
      return { ...prev, images: newImages };
    });
  };

  const handleMinus = (i: any) => {
    setValues((prev: any) => {
      const newData = { ...prev };
      // Filter out the image at index i
      newData.images = newData.images.filter((_: any, ind: any) => ind !== i);
      return newData;
    });
  };

  const handleFileChange = async (event: any) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]); // field name must match backend: `file`
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedFiles = response.data?.data; // should be array if using `upload.array`

      if (Array.isArray(uploadedFiles)) {
        const newImages = uploadedFiles.map((file: any) => ({
          image: file?.key || file?.location, // depending on what your S3 middleware returns
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

  return (
<div className={customClass ?? ""}>
  <label className="block mt-6 text-lg font-medium">Images</label>

  {/* Grid container */}
  <div className="grid grid-cols-4 auto-rows-[170px] gap-4 mt-4">
    {values.images?.length  > 0 && values.images?.map((img: any, i: number) => {
      const src = img?.image?.includes("http")
        ? img.image
        : `${process.env.NEXT_PUBLIC_S3_IMG_URL}${img.image}`;
      const isMain = i === 0;

      return (
        <div
          key={i}
          className={`relative group rounded overflow-hidden shadow border bg-gray-100 ${
            isMain ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
          }`}
        >
          <Image
            src={src}
            alt="Uploaded"
            fill
            sizes="100%"
            className="object-cover"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full shadow-md p-1 transition"
            onClick={() =>
              setValues((prev: any) => ({
                ...prev,
                images: prev.images.filter(
                  (_: any, idx: number) => idx !== i
                ),
              }))
            }
          >
            <MinusIcon className="h-4 w-4 text-red-500" />
          </button>
        </div>
      );
    })}

    {/* Add Image Button */}
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

  {/* Error Message */}
  {errors?.images?.[index] && (
    <p className="text-red-500 mt-2">{errors.images[index]}</p>
  )}

  {/* Optional Color Input */}
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

export const setImageErrors = (values: any, setErrors: any) => {
  const newErrors: any = {};
  let is_error = false;
  values.images.forEach((field: any, index: any) => {
    console.log(field.image, "this is image");

    if (!field.image) {
      is_error = true;
      newErrors[index] = "Image is required";
    }
  });
  console.log(newErrors);

  setErrors((prevValues: any) => ({
    ...prevValues,
    images: newErrors,
  }));
  return is_error;
};
