import { paths } from "@/src/layouts/paths";
import { QuranDynamicScreen } from "@/src/sections/quran/view/quran-dynamic-screen-view";
import { ICourse } from "@/src/types/course";
import { getCourseById } from "@/src/utils/server-functions/fetch-course-by-id";
import { Metadata } from "next";
import { FC } from "react";
import { redirect } from "next/navigation";
import { CourseDetailsView } from "@/src/sections/courses/view/course-details-view";

interface ICourseProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ICourseProps): Promise<Metadata> {
  const { id } = params;
  const data: ICourse = await getCourseById(id);

  return {
    title: data?.title ? data.title : "Not Found",
  };
}

const CourseDetailPage: FC<ICourseProps> = async ({ params }) => {
  const { id } = params;

  const course: ICourse = await getCourseById(id);

  if (course === undefined) {
    redirect(paths.page404);
  }
  return <CourseDetailsView course={course} id={id} />;
};

export default CourseDetailPage;
