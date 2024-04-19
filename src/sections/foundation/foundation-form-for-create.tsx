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
} from "../../components/material-tailwind-component/material-tailwind";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import {
  QNXFileUpload,
  QNXSelectField,
  QNXTextField,
} from "@/src/components/react-hook-form";
import QNXTextArea from "@/src/components/react-hook-form/qnx-text-area";
import {
  COURSE_CATEGORY,
  CategoryEnum,
  FOUNDATIONS,
  ICourse,
} from "@/src/types/course";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useCreateNewCourseMutation } from "@/src/redux/reducer/course/courseApi";
import { uploadImageOnImgbb } from "@/src/utils/imgbb-image-post";
import toast from "react-hot-toast";
import { courseCreateSchema } from "@/src/validation/course";
import { foundationSchema } from "@/src/validation/foundation";
import { IFoundation } from "@/src/types/foundation";
import { useCreateFoundationItemMutation } from "@/src/redux/reducer/foundation/foundationApi";

interface IFoundationFormProps {
  type?: string;
}

export function FoundationCreateForm({ type }: IFoundationFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [foundation, setFoundation] = useState("");

  const methods = useForm<IFoundation>({
    resolver: zodResolver(foundationSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = methods;

  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
  //   { name: "feature", control }
  // );

  const [createFoundationItem] = useCreateFoundationItemMutation();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    // if (!file) {
    //   toast.error("Please select an image");
    //   setIsLoading(false);
    //   return;
    // }

    if (data.category == null) {
      toast.error("Please select foundation");
      setIsLoading(false);
      return;
    }

    try {
      //   const imgData = await uploadImageOnImgbb(file!);
      const response = await createFoundationItem(data).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
        setIsLoading(false);
        reset();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  });

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
              {preview && (
                <img
                  src={preview}
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
                    <span className="text-gray-500">Upload Banner</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Card>
        <Card className="rounded-3xl border border-stroke  p-5 flex-1">
          <div className="flex flex-col gap-5">
            <QNXSelectField
              options={FOUNDATIONS}
              name="category"
              label="Foundation"
            />
            <QNXTextField name="title" label="Title" sx="col-span-2" />
          </div>
          <div className="flex justify-end mt-5">
            <Button type="submit" className="bg-teal-500" loading={isLoading}>
              Create New
            </Button>
          </div>
        </Card>
      </div>
    </FormProvider>
  );
}
