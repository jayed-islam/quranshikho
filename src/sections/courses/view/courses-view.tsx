import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/src/layouts/paths";
import { ICourse } from "@/src/types/course";
import React from "react";
import { CourseCard } from "../common/course-card";

interface ICourseProps {
  courses: ICourse[];
}

export const CoursesView = ({ courses }: ICourseProps) => {
  return (
    <div className="max-w-6xl px-5 md:px-0 mx-auto py-9 mt-24">
      <CustomBreadcrumbs
        heading="All Courses"
        links={[
          { name: "Home", href: paths.root },
          {
            name: "Courses",
          },
        ]}
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] pt-9 pb-20">
        {courses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
};
