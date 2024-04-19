import { paths } from "@/src/layouts/paths";
import { CoursesView } from "@/src/sections/courses/view/courses-view";
import { ICourse } from "@/src/types/course";
import { getAllCourses } from "@/src/utils/server-functions/fetch-courses";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Courses List",
};

export default async function CourseViewPage() {
  const courses: ICourse[] = await getAllCourses();

  if (!Array.isArray(courses)) {
    redirect(paths.page404);
  }
  return <CoursesView courses={courses} />;
}
