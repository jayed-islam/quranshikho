"use client";

import React from "react";
import { Button } from "../../components/material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import bg from "../../../public/assets/bg3.jpeg";
import cover from "../../../public/assets/bg7.jpg";
import sidebarImage from "../../../public/assets/bg4.jpeg";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/src/redux/hooks";
import { paths } from "@/src/layouts/paths";
import { useGetSingleCourseQuery } from "@/src/redux/reducer/course/courseApi";

interface ICOurseDetailsProps {
  id: string;
}

export const CourseDetailsViewSection = ({ id }: ICOurseDetailsProps) => {
  const { authenticated, user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetSingleCourseQuery(id);
  const courseInfo = [
    {
      icon: "fluent:person-square-24-regular",
      title: "Instructor",
      info: "Nazmul Hussain",
    },
    {
      icon: "solar:file-text-outline",
      title: "Lectures",
      info: "25",
    },
    {
      icon: "material-symbols:timer-outline",
      title: "Duration",
      info: "5Hr 36Minutes",
    },
    // {
    //   icon: "streamline:calendar-star",
    //   title: "Enrolled",
    //   info: "5k Students",
    // },
    // {
    //   icon: "fluent:ribbon-star-24-regular",
    //   title: "Course level",
    //   info: "Intermediate",
    // },
    // {
    //   icon: "ic:outline-language",
    //   title: "Language",
    //   info: "Bangla",
    // },
  ];

  const free = "free";
  const isFree = () => free === "free";
  const icons = ["logos:facebook", "logos:twitter", "logos:pinterest"];

  const {
    banner,
    category,
    feature,
    title,
    description,
    subDescription,
    instructor,
  } = data?.data!;
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-gray-100">
          <div className="w-full h-96">
            <Image
              src={cover}
              alt=""
              className=" rounded-md object-cover w-full h-full block"
            />
          </div>
          <div className="grid grid-cols-12 gap-[30px] max-w-6xl mx-auto py-16">
            <div className="lg:col-span-8 col-span-12">
              <div className="bg-white p-5 border shadow-sm rounded-2xl">
                <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                  <Image
                    src={banner!}
                    alt=""
                    height={500}
                    width={500}
                    className=" rounded-md object-cover w-full h-full block"
                  />
                </div>
                <div className=" mb-6">
                  <span className="bg-teal-600 py-1 px-3 text-lg font-semibold rounded text-white ">
                    {category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold">
                  {title}
                </h2>
                <div className="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                  <div className="flex space-x-4 items-center group">
                    <div className="flex-none">
                      <div className="h-12 w-12 rounded">
                        <img
                          src="https://img.freepik.com/free-photo/medium-shot-islamic-man-reading_23-2151064102.jpg?size=626&ext=jpg&ga=GA1.1.1035986881.1705834422&semt=sph"
                          alt=""
                          className=" object-cover w-full h-full rounded"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className=" text-secondary  ">
                        Trainer
                        <a href="#" className=" text-black">
                          : {instructor}
                        </a>
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className=" text-secondary  ">
                      Last Update:
                      <a href="#" className=" text-black">
                        10 January, 2024
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-white p-5 rounded-2xl shadow-sm border">
                <h3 className="text-2xl font-semibold">Course Description</h3>
                <p className="mt-4">
                  {description}
                  <br /> <br /> {subDescription}
                </p>
                <div className="bg-[#edebeb] space-y-6 p-8 rounded-md my-8">
                  <h4 className=" text-2xl">What You will Learn?</h4>
                  <ul className=" grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <li className=" flex space-x-3">
                      <div className="flex-none  relative top-1 ">
                        <Icon
                          icon="fa-regular:check-square"
                          className="text-lg"
                        />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>

                    <li className=" flex space-x-3">
                      <div className="flex-none  relative top-1 ">
                        <Icon
                          icon="fa-regular:check-square"
                          className="text-lg"
                        />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>

                    <li className=" flex space-x-3">
                      <div className="flex-none  relative top-1 ">
                        <Icon
                          icon="fa-regular:check-square"
                          className="text-lg"
                        />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>

                    <li className=" flex space-x-3">
                      <div className="flex-none  relative top-1 ">
                        <Icon
                          icon="fa-regular:check-square"
                          className="text-lg"
                        />
                      </div>
                      <div className="flex-1">
                        Learn how perspective works and how to incorporate your
                        art
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className=" text-2xl">What You will Learn?</h4>
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                    {[
                      "Computer/Mobile",
                      "Paper &amp; Pencil",
                      "Internet Connect",
                    ].map((info, index) => (
                      <div
                        key={index}
                        className=" bg-teal-200  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center"
                      >
                        <span className="flex-none">
                          <img src="assets/images/icon/wifi.svg" alt="" />
                        </span>
                        <span className="flex-1 text-black">{info}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 bg-white p-5 rounded-2xl shadow-sm border h-min md:sticky top-32">
              <div className="">
                <div className="">
                  <a className="h-[220px] rounded relative block" href="#">
                    <Image
                      src={sidebarImage}
                      alt=""
                      className=" block w-full h-full object-cover rounded-2xl "
                    />
                    <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icon
                        icon="pepicons-pop:play-circle-filled"
                        className="text-5xl"
                      />
                    </div>
                  </a>
                  <h3 className="text-4xl font-bold my-3">Free</h3>
                  <Link
                    href={
                      !authenticated
                        ? paths.website.signin
                        : !isFree()
                        ? paths.account.root
                        : paths.checkout
                    }
                  >
                    <Button
                      className="w-full text-center enroll-now-button mb-9 py-4 capitalize text-lg"
                      size="lg"
                    >
                      Enroll Now
                    </Button>
                  </Link>
                  <ul className="list">
                    {courseInfo.map((info, index) => (
                      <li
                        key={index}
                        className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0"
                      >
                        <div className="flex-1 space-x-3 flex">
                          <Icon
                            icon={info.icon}
                            className="text-teal-600 text-lg"
                          />
                          <div className=" text-black font-semibold">
                            {info.title}
                          </div>
                        </div>
                        <div className="flex-none">{info.info}</div>
                      </li>
                    ))}
                  </ul>
                  <div className=" pt-3 flex items-center gap-5">
                    <div className=" text-black font-semibold">Share On:</div>

                    <div className="flex space-x-4 items-center">
                      {icons.map((icon, index) => (
                        <div key={index}>
                          <a href="#" className="">
                            <Icon icon={icon} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
