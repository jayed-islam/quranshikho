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
import { COURSE_CATEGORY, CategoryEnum, ICourse } from "@/src/types/course";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import {
  useCreateNewClassOfCourseMutation,
  useCreateNewCourseMutation,
  useGetCourseSelectionDataQuery,
} from "@/src/redux/reducer/course/courseApi";
import { uploadImageOnImgbb } from "@/src/utils/imgbb-image-post";
import toast from "react-hot-toast";
import {
  courseClassCreateSchema,
  courseCreateSchema,
} from "@/src/validation/course";

interface ICourseFormProps {
  type?: string;
  course: ICourse;
}

export function CourseClassCreateForm({ type, course }: ICourseFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(courseClassCreateSchema),
    defaultValues: {
      courseId: course._id,
    },
  });

  //   const { data } = useGetCourseSelectionDataQuery();
  const [createClassOfCourse] = useCreateNewClassOfCourseMutation();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await createClassOfCourse(data).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success("Class created successfully");
        setIsLoading(false);
        reset();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="flex items-start gap-7 flex-col lg:flex-row">
        <Card className="rounded-2xl shadow-md border border-stroke w-[21rem] p-5 min-h-[21rem] ">
          <h2 className="text-lg font-medium pb-5">{course.title}</h2>
          <img
            src={course.banner}
            alt="Preview"
            className="w-full rounded-xl"
          />
        </Card>
        <Card className="rounded-3xl border border-stroke  p-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <QNXTextField name="title" label="Class Title" sx="col-span-2" />
            <QNXTextField name="videoUrl" label="Video ID" />
            <QNXTextField name="videoDuration" label="Video Duration" />
            {/* <QNXSelectField
              name="courseId"
              label="Course ID"
              sx="col-span-2"
              options={data?.data ?? []}
            /> */}
            {/* <QNXTextField name="courseId" label="Course ID" sx="invisible" /> */}
            {/* <QNXTextField name="courseId" label="Course ID" /> */}

            <QNXTextArea
              name="description"
              label="Description"
              sx="col-span-2"
            />
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
