import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/src/layouts/paths";
import React from "react";
import { CourseCreateForm } from "../common/course-create-form";

export default function DashboardCourseCreateView() {
  return (
    <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
      <CustomBreadcrumbs
        heading=" Create a new Course"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          {
            name: "Courses",
            href: paths.dashboard.course.list,
          },
          {
            name: "Create",
          },
        ]}
      />
      <div className="mt-11">
        <CourseCreateForm />
      </div>
    </div>
  );
}
