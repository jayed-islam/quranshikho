"use client";

/* eslint-disable react/no-unescaped-entities */
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import { Button } from "../../components/material-tailwind-component/material-tailwind";
import Image from "next/image";
import { useGetCourseDataQuery } from "@/src/redux/reducer/course/courseApi";
import { paths } from "@/src/layouts/paths";
import quran from "../../../public/assets/quran.png";

export const MainHomeView = () => {
  const { data, isLoading } = useGetCourseDataQuery();
  return (
    <div
      className="h-screen"
      style={{
        background: `url('../../../assets/homebanner.jpeg') center center / cover no-repeat`,
      }}
    >
      <div className="w-full h-full bg-[rgba(0,0,0,0.4)] box-border flex items-center justify-center ">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-5 lg:px-0">
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold text-center  max-w-4xl ">
            Start your{" "}
            <span className="text-yellow-500 "> Quranic enlightenment</span>{" "}
            journey with us.
          </h2>
          <p className="text-white lg:max-w-2xl text-center mt-5 text-md md:text-xl">
            "Read the Book of Allah with contemplation and reflection, for
            within it lies guidance for the righteous, healing for broken
            hearts, and a light that illuminates the paths of success for the
            believers."
          </p>
          <Link href="#courses">
            <Button
              size="md"
              variant="outlined"
              className="mt-9 border-2 border-teal-500 rounded-full capitalize bg-white text-black text-md md:text-lg flex items-center transition-all hover:translate-x-1 duration-200 px-4 py-2 md:py-3 md:px-7 gap-2 hover:text-teal-600 "
            >
              <Icon
                icon="streamline:quality-education"
                className="text-md sm:text-xl hover:text-teal-600 transition-all duration-200"
              />
              See Our Courses
              <Icon
                icon="ep:d-arrow-right"
                className="text-md sm:text-xl hover:text-teal-600 transition-all duration-200"
              />
            </Button>
          </Link>

          <Link href={paths.website.quranMazid} className="lg:hidden mt-5">
            <Button
              variant="filled"
              className={`capitalize text-white bg-[#00ab55] flex items-center p-0 px-3 text-md md:text-lg rounded-full`}
            >
              <Image src={quran} alt="" className="w-9 md:w-11" />
              Quran Mazid
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
