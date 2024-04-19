"use client";

import { useAppSelector } from "@/src/redux/hooks";
import {
  Button,
  Progress,
} from "../../../components/material-tailwind-component/material-tailwind";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { paths } from "@/src/layouts/paths";

export const MyClassesView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="max-w-6xl mx-auto px-5 xl:px-0 pt-16 md:pt-32">
      <h2 className="text-xl mt-5 md:mt-0">
        Welcome Back{" "}
        <span className="text-teal-600">{user && user.fullName}</span>, Ready
        For Your Next Lesson?
      </h2>

      <div className="mt-11 mb-20">
        <h1 className="text-3xl text-teal-600 font-semibold">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
          {user &&
            user?.enrolledCourses?.map((course, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-white shadow-md flex items-start flex-col lg:flex-row gap-4 border"
              >
                <Image
                  height={500}
                  width={500}
                  src={course.banner}
                  alt=""
                  className="rounded-xl w-full lg:w-64 h-40 object-cover"
                />
                <div>
                  <h1 className="text-lg font-semibold line-clamp-2 overflow-ellipsis">
                    {course.title}
                  </h1>
                  <h2 className="text-teal-600 text-sm font-semibold mt-1">
                    {course.instructor}
                  </h2>
                  <Progress
                    value={55}
                    size="sm"
                    color="teal"
                    className="mt-2"
                  />
                  <div className="flex items-center gap-3 mt-3">
                    <Link href={`${paths.myClases.root}/${course._id}`}>
                      <Button
                        variant="filled"
                        size="sm"
                        className="bg-teal-600 rounded capitalize"
                      >
                        Continue
                      </Button>
                    </Link>
                    <Button
                      variant="text"
                      size="sm"
                      className="rounded border-teal-600 border capitalize"
                    >
                      Outline
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
