"use client";

/* eslint-disable react/no-unescaped-entities */
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import { Button } from "../../components/material-tailwind-component/material-tailwind";
import svg from "../../../public/assets/quran.svg";
import svg2 from "../../../public/assets/graduate.svg";
import svg3 from "../../../public/assets/user.svg";
import Image from "next/image";
import { HomeIntroSection } from "./common/home-intro-section";
import bg from "../../../public/assets/homebanner.jpeg";
import videoCourse from "../../../public/assets/courses.png";
import onlineCourse from "../../../public/assets/online-education.png";
import free from "../../../public/assets/free.png";
import freeCourse from "../../../public/assets/quran-learning.jpg";
import { useGetCourseDataQuery } from "@/src/redux/reducer/course/courseApi";
import { CourseCard } from "../courses/common/course-card";

export const MainHomeView = () => {
  const { data, isLoading } = useGetCourseDataQuery();
  return (
    <div
      style={{
        background: `url('../../../assets/homebanner.jpeg') center center / cover no-repeat`,
      }}
    >
      <div className="w-full h-full bg-[rgba(0,0,0,0.4)] box-border">
        <div className="max-w-6xl mx-auto flex flex-col items-center py-24 md:py-32 lg:py-40 ">
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold text-center  max-w-4xl ">
            Start your{" "}
            <span className="text-yellow-500 "> Quranic enlightenment</span>{" "}
            journey with us.
          </h2>
          <p className="text-white max-w-[81%] lg:max-w-4xl text-center mt-5 text-md md:text-xl">
            "Read the Book of Allah with contemplation and reflection, for
            within it lies guidance for the righteous, healing for broken
            hearts, and a light that illuminates the paths of success for the
            believers."
          </p>
        </div>
        {/* <div className="flex items-center flex-col lg:flex-row gap-5 max-w-6xl mx-auto pt-20 pb-11">
          <div className="bg-black bg-opacity-40 p-5 rounded-3xl border-2 border-teal-500">
            <div className="flex items-center gap-3 pb-5 pl-5">
              <Image src={videoCourse} alt="" className="w-9" />
              <h2 className="text-2xl font-semibold text-white pt-1">
                Free Video Course
              </h2>
            </div>
            {isLoading
              ? [1].map((item, index) => (
                  <div className="rounded-2xl border w-full" key={index}>
                    <div className="animate-pulse flex flex-col">
                      <div className=" bg-gray-200 h-[249px] w-full rounded-t-2xl "></div>
                      <div className="flex-1 p-5">
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="mt-5">
                          <div className="flex flex-col gap-3">
                            <div className="h-3 bg-gray-200 rounded max-w-[171px]"></div>
                            <div className="h-3 bg-gray-200 rounded max-w-[191px]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t p-4 flex items-center justify-center">
                        <div className="h-3 bg-gray-200 rounded w-40"></div>
                      </div>
                    </div>
                  </div>
                ))
              : data?.data
                  ?.slice(0, 1)
                  .map((course, index) => (
                    <CourseCard course={course} key={index} />
                  ))}
          </div>
          <div className="bg-black bg-opacity-40 p-5 rounded-3xl border-2 border-teal-500">
            <div className="flex items-center gap-3 pb-5 pl-5">
              <Image src={onlineCourse} alt="" className="w-9" />
              <h2 className="text-2xl font-semibold text-white pt-1">
                Live Online Course
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {isLoading
                ? [1, 2].map((item, index) => (
                    <div className="rounded-2xl border w-full" key={index}>
                      <div className="animate-pulse flex flex-col">
                        <div className=" bg-gray-200 h-[249px] w-full rounded-t-2xl "></div>
                        <div className="flex-1 p-5">
                          <div className="h-3 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded"></div>
                          <div className="mt-5">
                            <div className="flex flex-col gap-3">
                              <div className="h-3 bg-gray-200 rounded max-w-[171px]"></div>
                              <div className="h-3 bg-gray-200 rounded max-w-[191px]"></div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t p-4 flex items-center justify-center">
                          <div className="h-3 bg-gray-200 rounded w-40"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : data?.data
                    ?.slice(1, 3)
                    .map((course, index) => (
                      <CourseCard course={course} key={index} />
                    ))}
            </div>
          </div>
        </div> */}

        {/* <div className="bg-black bg-opacity-40 max-w-6xl mx-auto p-5 mt-11">
          <div className="max-w-xs bg-white p-3 rounded-3xl  cursor-pointer relative group">
            <Image src={freeCourse} alt="" className=" rounded-3xl" />
            <Image
              src={free}
              alt=""
              className="w-32 absolute right-2 bottom-20 -rotate-12"
            />
            <h4 className="text-xl mb-3 font-bold transition-all duration-200 group-hover:text-teal-600 mt-2 text-center">
              সবার জন্য সহজ কুরআন শিক্ষা Easy Quran Learning for All
            </h4>
          </div>
        </div> */}
      </div>
    </div>
    // <div className="">
    //   <div className="max-w-6xl mx-auto pt-24">
    //     <div className=" relative rounded-3xl">
    //       <Image
    //         src={bg}
    //         alt=""
    //         className="h-44 md:h-[400px] object-cover w-full rounded-3xl shadow-2xl"
    //       />
    //       <div className="bg-[rgba(0,0,0,0.4)] absolute top-0 bottom-0 left-0 right-0 rounded-3xl flex items-center justify-center flex-col">
    // <h2 className="text-3xl md:text-4xl lg:text-6xl text-white font-bold max-w-[71%] text-center ">
    //   Start your{" "}
    //   <span className="text-yellow-500 "> Quranic enlightenment</span>{" "}
    //   journey with us.
    // </h2>
    // <p className="text-white max-w-[41%] text-center mt-7 text-md">
    //   "Read the Book of Allah with contemplation and reflection, for
    //   within it lies guidance for the righteous, healing for broken
    //   hearts, and a light that illuminates the paths of success for the
    //   believers."
    // </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
