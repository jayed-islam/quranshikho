"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/material-tailwind-component/material-tailwind";
import { useGetCourseDataQuery } from "@/src/redux/reducer/course/courseApi";
import { CourseCard } from "../../courses/common/course-card";
import { paths } from "@/src/layouts/paths";
import videoCourse from "../../../../public/assets/online-education.png";
import Quran from "../../../../public/assets/quran-p.png";
import personalTutor from "../../../../public/assets/personal-teacher.jpg";
import live from "../../../../public/assets/live-video.png";
import muslim_men from "../../../../public/assets/muslim-men.jpg";
import muslim_women from "../../../../public/assets/muslim-women.png";

export const HomeCoursesView = () => {
  const { data, isLoading } = useGetCourseDataQuery();
  return (
    <div className="bg-gray-100 py-11" id="courses">
      <div className="max-w-6xl mx-auto md:bg-white rounded-md px-5 pb-5 md:pt-11">
        <div className="flex items-center justify-center gap-3">
          <Image src={videoCourse} alt="" className="w-9 md:w-11" />
          <h2 className="text-2xl md:text-4xl font-semibold  pt-1">
            আমাদের কোর্সসমুহ
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 pt-7">
          {isLoading
            ? [1, 2, 3].map((item, index) => (
                <div className="rounded-2xl border  w-full " key={index}>
                  <div className="animate-pulse flex flex-col">
                    <div className=" bg-gray-200 h-[171px] w-full rounded-t-2xl "></div>
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
            : data?.data?.map((course, index) => (
                <CourseCard course={course} key={index} />
              ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto md:bg-white rounded-md p-5 m-11">
        <div className="flex items-center justify-center gap-3">
          <Image src={Quran} alt="" className="w-5 md:w-11" />
          <h2 className="text-2xl md:text-4xl font-semibold  pt-1">
            প্রাইভেট কুরআন শিক্ষা লাইভ
          </h2>
        </div>
        <div className="flex items-start flex-col lg:flex-row gap-5 mt-11">
          <div className="relative w-full">
            <Image src={personalTutor} alt="" className="w-full rounded-md " />

            <Image
              src={live}
              alt="live quran learning"
              className="w-11 md:w-16 absolute right-5 top-5"
            />
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold">
              ব্যক্তিগত ভাবে উস্তাদের মাধ্যমে কুরআন শিখুন লাইভে।
            </h2>
            <p className="text-lg text-gray-800 mt-5">
              প্রায়ভেট ভাবে একজন নির্দিষ্ট উস্তাদের মাধ্যমে আপনি কুরআন শিখতে
              পারবেন এই কোর্সে এনরোল করে, ইন-শা-আল্লাহ। নির্দিষ্ট সময় অনুযায়ী
              আপনাকে শিখানো হবে।
            </p>
            <p className="text-md font-semibold mt-5">
              শিশু অথবা মহিলাদের জন্য থাকবে মহিলা উস্তাযা এবং পুরুষদের জন্য
              থাকবে পুরুষ উস্তাদ
            </p>

            <div className="flex items-center gap-5 justify-center md:justify-start  mt-5">
              <div className="cursor-pointer hover:text-teal-600 transition-all duration-200">
                <Image
                  src={muslim_men}
                  className="w-32 h-24 rounded-xl shadow-sm object-cover border border-teal-500"
                  alt=""
                />
                <h1 className="text-center font-semibold mt-2">উস্তায</h1>
              </div>
              <div className="cursor-pointer hover:text-teal-600 transition-all duration-200">
                <Image
                  src={muslim_women}
                  className="w-32 h-24 rounded-xl shadow-sm object-cover border border-teal-500"
                  alt=""
                />
                <h2 className="text-center font-semibold mt-2">উস্তাযা</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
