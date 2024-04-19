"use client";

import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/src/layouts/paths";
import React from "react";
import { CourseEditForm } from "../common/course-edit-form";
import { useGetSingleCourseQuery } from "@/src/redux/reducer/course/courseApi";

interface ICourseEditFormProps {
  id: string;
}

export default function DashboardCourseEditView({ id }: ICourseEditFormProps) {
  const { data, isLoading } = useGetSingleCourseQuery(id);

  return (
    <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
      <CustomBreadcrumbs
        heading="Edit Course"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          {
            name: "Courses",
            href: paths.dashboard.course.list,
          },
          {
            name: data?.data.title,
          },
        ]}
      />
      <div className="mt-11">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <CourseEditForm initialValue={data?.data!} />
        )}
      </div>
    </div>
  );
}
