"use client";

import React from "react";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/src/layouts/paths";
import {
  Progress,
  Button,
} from "../../components/material-tailwind-component/material-tailwind";

export default function MyCourseViewSection() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user &&
          user?.enrolledCourses?.map((course, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white shadow-md flex items-start flex-col md:flex-row  gap-4"
            >
              <Image
                height={500}
                width={500}
                src={course.banner}
                alt=""
                className="rounded-xl w-full md:w- h-40  md:h-28 object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold line-clamp-2 overflow-ellipsis">
                  {course.title}
                </h1>
                <h2 className="text-teal-600 text-sm font-semibold mt-1">
                  {course.instructor}
                </h2>
                <Progress value={55} size="sm" color="teal" className="mt-2" />
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
  );
}
