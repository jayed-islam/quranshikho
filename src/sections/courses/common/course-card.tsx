import { ICourse } from "@/src/types/course";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import free from "../../../../public/assets/free.png";
import live from "../../../../public/assets/live-video.png";

interface CourseCardProps {
  course: ICourse;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="rounded-md p-3 shadow-sm bg-white border group overflow-hidden hover:border-teal-600 transition duration-100">
      <Link
        className="rounded-2xl transition duration-100"
        href={`/courses/${course._id}`}
      >
        <div className="h-[171px] rounded-md relative overflow-hidden">
          <Image
            src={course.banner}
            alt=""
            height={500}
            width={500}
            className="w-full h-full object-cover rounded-md duration-500 transition-transform transform group-hover:scale-125"
          />
          {course.type == "paid" && (
            <Image
              src={live}
              alt="live video icon"
              className="absolute top-2 right-2 w-11"
            />
          )}
        </div>
        <div className="relative">
          <div className=" py-3">
            <div className="h-16">
              <h4 className="text-left text-lg mb-3 font-semibold transition-all duration-200 group-hover:text-teal-600 line-clamp-2 overflow-ellipsis">
                {course.title}
              </h4>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              <Icon icon="solar:video-library-linear" className="text-xl" />
              <h2>Total Classes: 51</h2>
            </div>
            {/* <div className="flex items-center gap-3 text-gray-600 text-lg">
              <Icon icon="fluent:people-32-regular" className="text-[25px]" />
              <h2>Addmitted here 131</h2>
            </div> */}
          </div>

          {course.type === "free" && (
            <Image
              src={free}
              alt=""
              className="w-24 absolute right-2 bottom-8 -rotate-12"
            />
          )}
          <div className="flex items-center justify-center bg-teal-500 rounded-md transition-all duration-200 hover:bg-teal-600">
            <h2 className="text-white py-2 font-medium text-sm">
              বিস্তারিত দেখুন
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
