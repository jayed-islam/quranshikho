"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, object, ZodType, any } from "zod";
import Image from "next/image";
import { IFeatureItem, ILecturerInfo } from "@/src/types/feature";
import QNXDatePicker from "@/src/components/react-hook-form/qnx-datepicker";
import {
  Button,
  Card,
} from "../../../components/material-tailwind-component/material-tailwind";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import {
  QNXFileUpload,
  QNXSelectField,
  QNXTextField,
} from "@/src/components/react-hook-form";
import QNXTextArea from "@/src/components/react-hook-form/qnx-text-area";
import {
  COURSE_CATEGORY,
  COURSE_TYPE,
  CategoryEnum,
  ICourse,
} from "@/src/types/course";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import {
  useCreateNewCourseMutation,
  useUpdateCourseMutation,
} from "@/src/redux/reducer/course/courseApi";
import { uploadImageOnImgbb } from "@/src/utils/imgbb-image-post";
import toast from "react-hot-toast";
import { courseEditSchema } from "@/src/validation/course";

interface ICourseFormProps {
  initialValue: Partial<ICourse>;
}

export function CourseEditForm({ initialValue }: ICourseFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<Partial<ICourse>>({
    resolver: zodResolver(courseEditSchema),
    defaultValues: initialValue as Partial<ICourse>,
  });

  const [updateCourse] = useUpdateCourseMutation();

  // console.log("course submit", initialValue);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = methods;

  const [features, setFeatures] = useState(
    initialValue?.feature?.map((feature) => feature)
  );

  const addFeature = () => {
    setFeatures([...features!, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features!.filter((_, i) => i !== index));
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const updateData = {
      ...data,
      _id: initialValue._id,
    };

    try {
      if (file !== null) {
        const imgData = await uploadImageOnImgbb(file!);

        const uploadData = { ...updateData, banner: imgData };

        const response = await updateCourse(uploadData).unwrap();

        console.log(response);
        if (response.statusCode === 200) {
          toast.success("Course updated successfully");
          setIsLoading(false);
        }
      } else {
        const response = await updateCourse(updateData).unwrap();

        console.log(response);
        if (response.statusCode === 200) {
          toast.success("Course updated successfully");
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  });

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];
  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue("banner", newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="flex items-start gap-7 flex-col lg:flex-row">
        <Card className="rounded-2xl shadow-md border border-stroke w-[21rem] p-5 min-h-[21rem] ">
          <div className="">
            <div className="flex items-center flex-col w-full justify-center gap-5">
              {/* <QNXFileUpload label="Banner" name="banner" onDrop={handleDrop} /> */}
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-xl"
                />
              ) : (
                <img
                  src={initialValue?.banner}
                  alt="Preview"
                  className="w-full rounded-xl"
                />
              )}
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/bmp, image/gif, image/tiff, image/webp, image/heic, image/avif"
                  className="hidden"
                  onChange={handleFileChange}
                  id="banner"
                />
                <label htmlFor="banner">
                  <div className="avatar-preview border-2 border-gray-300 rounded-full h-11  flex items-center justify-center cursor-pointer px-5 gap-3">
                    <Icon icon="bi:image" className="text-xl" />
                    <span className="text-gray-500">Upload Image</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Card>
        <Card className="rounded-3xl border border-stroke  p-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <QNXTextField name="title" label="Title" sx="col-span-2" />
            <QNXTextField name="instructor" label="Instructor" />
            <QNXTextField name="duration" label="Duration" />
            <QNXTextField name="price" label="Price" type="number" />

            <QNXTextField name="discount" label="Discount" />
            <QNXSelectField
              name="category"
              label="Category"
              options={COURSE_CATEGORY}
            />

            <QNXTextField name="videoId" label="Youtube Video Id" />
            <QNXSelectField
              name="type"
              label="Course Type"
              sx="col-span-2"
              options={COURSE_TYPE}
            />
            <QNXTextArea
              name="description"
              label="Description"
              sx="col-span-2"
              rows={7}
            />
            <QNXTextArea
              name="subDescription"
              label="Sub Description"
              sx="col-span-2"
              rows={7}
            />
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="flex flex-col gap-5">
                {features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2  w-full"
                  >
                    <QNXTextField
                      name={`feature[${index}]`}
                      label={`Feature ${index + 1}`}
                      sx="col-span-2 w-full"
                    />
                    <Button
                      type="button"
                      variant="filled"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Feature
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button type="submit" className="bg-teal-500" loading={isLoading}>
              Edit Item
            </Button>
          </div>
        </Card>
      </div>
    </FormProvider>
  );
}
