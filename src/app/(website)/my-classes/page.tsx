import { CourseCheckoutView } from "@/src/sections/courses/view/course-checkout-view";
import { MyClassesView } from "@/src/sections/my-classes/view/my-classes-view";
import React from "react";

export const metadata = {
  title: "My Classes",
};

const MyClassesPage = () => {
  return <MyClassesView />;
};

export default MyClassesPage;
