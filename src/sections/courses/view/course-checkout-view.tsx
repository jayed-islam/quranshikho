/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { QNXTextField } from "@/src/components/react-hook-form";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import { Button } from "../../../components/material-tailwind-component/material-tailwind";
import { paths } from "@/src/layouts/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import nagad_logo from "../../../../public/assets/nagad-logo.svg";
import rocket_logo from "../../../../public/assets/rocket-logo.png";
import Image from "next/image";
import { z } from "zod";
import { emailRegex } from "@/src/constants/config-global";
import { useAppSelector } from "@/src/redux/hooks";
import {
  useCourseCheckoutSubmitMutation,
  useGetSingleCourseQuery,
} from "@/src/redux/reducer/course/courseApi";
import {
  checkoutSchema,
  freeCourseCheckoutSchema,
} from "@/src/validation/course";
import { CourseStatus, CourseType } from "@/src/constants/course";
import { ICourseCheckout } from "@/src/types/course";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const CourseCheckoutView = () => {
  const [currCourseId, setCurrCourseId] = useState("");
  const { user, authLoading } = useAppSelector((state) => state.auth);
  // https://www.youtube.com/watch?v=exCPZdGesXY
  const [submitCheckoutData] = useCourseCheckoutSubmitMutation();

  const router = useRouter();

  useEffect(() => {
    const storedCourseId = localStorage.getItem("currCourseId");

    if (storedCourseId) {
      setCurrCourseId(storedCourseId);
      const isEnrolled = !!user?.enrolledCourses?.find(
        (course, index) => course._id === storedCourseId
      );
      if (isEnrolled) {
        setTimeout(() => {
          toast.success("You are already enrolled in this course!");
        }, 1000);
        router.back();
      }
    } else {
      router.push(paths.course.root);
    }
  }, []);

  const { data: coursedata, isLoading } = useGetSingleCourseQuery(currCourseId);

  const isFree = () => coursedata?.data.type === "free";

  const methods = useForm({
    resolver: zodResolver(isFree() ? freeCourseCheckoutSchema : checkoutSchema),
    defaultValues: {
      email: user?.email && user?.email,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const freeCoursedata: Partial<ICourseCheckout> = {
      ...data,
      courseId: coursedata?.data._id,
      type: CourseType.FREE,
      status: CourseStatus.ACTIVE,
      transactionId: "freeCourse",
    };

    const paidCoursedata: Partial<ICourseCheckout> = {
      ...data,
      courseId: coursedata?.data._id,
      type: CourseType.PAID,
      status: CourseStatus.PENDING,
    };

    try {
      const checkoutResponse = await submitCheckoutData(
        coursedata?.data && coursedata.data.type === CourseType.FREE
          ? freeCoursedata
          : paidCoursedata
      ).unwrap();

      if (checkoutResponse.statusCode === 200) {
        toast.success(checkoutResponse.message);
        router.push(paths.account.root);
      } else {
        toast.error(checkoutResponse.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  return (
    <div>
      <div className="max-w-6xl px-5 md:px-0 mx-auto py-9 mt-24 ">
        <CustomBreadcrumbs
          heading="Checkout"
          links={[
            { name: "Home", href: paths.root },
            {
              name: "Course",
              href: paths.course.root,
            },
            {
              name: coursedata?.data.title,
            },
          ]}
        />
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {!isFree() ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-7">
              <div className="flex flex-col gap-5">
                <div className="flex items-center  w-full gap-5">
                  <div className="shadow-sm rounded-2xl p-5 border flex flex-col items-center justify-center w-full">
                    <Image src={rocket_logo} alt="" className="w-28" />
                    <h1>(Personal)</h1>
                    <h2 className="text-xl font-semibold">01234567890</h2>
                  </div>
                  <div className="shadow-sm rounded-2xl p-5 border flex flex-col items-center justify-center w-full">
                    <Image src={nagad_logo} alt="" className="w-28" />
                    <h1>(Personal)</h1>
                    <h2 className="text-xl font-semibold">01234567890</h2>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Transaction ID</h2>
                  <h1 className="pt-2">
                    Send $500 in this Nagad or Rocket number and then take the
                    transaction ID number which will you got you app
                    notification . or your mobile message section cpopy the
                    <span className="font-semibold text-teal-600 px-1">
                      Transaction ID
                    </span>
                    and past it in the input section.
                  </h1>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <QNXTextField name="firstName" label="First Name" />
                <QNXTextField name="lastName" label="Last Name" />
              </div> */}
                <QNXTextField name="email" label="Email" readOnly />
                <QNXTextField name="fullName" label="Full Name" />
                <QNXTextField name="phone" label="Phone" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <QNXTextField name="transactionId" label="Transaction ID" />
                  <QNXTextField
                    name="methodNumber"
                    label="Sended Nagad or Rocket Number"
                  />
                </div>

                <h2 className="font-medium">
                  We will verify your transaction id number and notify you. then
                  you will be completly enrolled in this course in-Sha-Allah
                </h2>
              </div>
              <div className="shadow-sm border rounded-2xl p-5 h-min">
                <h2 className="text-xl md:text-3xl font-serif font-bold">
                  {coursedata?.data.title}
                </h2>
                <div className="flex items-center gap-3 mt-5 text-2xl">
                  <h2 className="">Price:</h2>
                  <p className="font-semibold text-teal-600">
                    ৳ {coursedata?.data.price}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="capitalize mt-11 enroll-now-button md:w-40 w-full"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            // <div className="mt-7 max-w-xl flex items-center justify-center mx-auto py-11">
            //   <div className="shadow-md border rounded-2xl p-5">
            //     <h2 className="text-xl md:text-3xl font-serif font-bold">
            //       {data?.data.title}
            //     </h2>
            //     <div className="flex items-center gap-3 mt-5 text-2xl">
            //       <h2 className="">Price:</h2>
            //       <p className="font-semibold text-teal-600">
            //         ৳ {isFree() ? "Free" : data?.data.price}
            //       </p>
            //     </div>
            //     <div className="flex flex-col gap-5 mt-5">
            //       <QNXTextField name="email" label="Email" readOnly />
            //       <QNXTextField name="phone" label="Phone" />
            //     </div>
            //     <Button
            //       type="submit"
            //       className="capitalize mt-11 enroll-now-button md:w-40 w-full"
            //       size="lg"
            //     >
            //       Submit
            //     </Button>
            //   </div>
            // </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-7">
              <div className="flex flex-col gap-5 shadow-sm border rounded-2xl"></div>
              <div className="shadow-sm border rounded-2xl p-5 h-min">
                <h2 className="text-xl md:text-3xl font-serif font-bold">
                  {coursedata?.data.title}
                </h2>
                <div className="flex items-center gap-3 mt-5 text-2xl">
                  <h2 className="">Price:</h2>
                  <p className="font-semibold text-teal-600 line-through">
                    ৳ {coursedata?.data.price}
                  </p>
                  <p className="font-semibold text-teal-600">free</p>
                </div>

                <div className="flex flex-col gap-5 mt-5">
                  <QNXTextField name="email" label="Email" readOnly />
                  <QNXTextField name="fullName" label="Full Name" />
                  <QNXTextField name="phone" label="Phone" />
                </div>
                <Button
                  type="submit"
                  className="capitalize mt-11 enroll-now-button md:w-40 w-full"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </FormProvider>
      </div>
    </div>
  );
};
