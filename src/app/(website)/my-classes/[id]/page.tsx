import { CourseClassView } from "@/src/sections/my-classes/view/course-class-view";
import { QuranDynamicScreen } from "@/src/sections/quran/view/quran-dynamic-screen-view";
import { FC } from "react";

export const metadata = {
  title: "Quran: Quran.com",
};

interface ICourseClassProps {
  params: {
    id: string;
  };
}

const CourseClassPage: FC<ICourseClassProps> = ({ params }) => {
  const { id } = params;
  return <CourseClassView id={id as string} />;
};

export default CourseClassPage;
