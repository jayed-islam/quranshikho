"use client";
import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/src/layouts/paths";
import React from "react";
import { CourseClassCreateForm } from "../common/course-class-create-form";
import { useGetSingleCourseQuery } from "@/src/redux/reducer/course/courseApi";

interface ICourseClassProps {
  id: string;
}

export default function DashboardCourseClassCreateView({
  id,
}: ICourseClassProps) {
  const { data, isLoading } = useGetSingleCourseQuery(id);
  return (
    <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
      <CustomBreadcrumbs
        heading=" Create a new Class"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          {
            name: "Courses Class",
            href: paths.dashboard.courseClasses.list,
          },
          {
            name: "Create",
          },
        ]}
      />
      <div className="mt-11"></div>
      <div className="mt-11">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <CourseClassCreateForm course={data?.data!} />
        )}
      </div>
    </div>
  );
}
