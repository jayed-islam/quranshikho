import React from "react";
import IslamPillars from "../home-islam-foundations";
import { HomeBlogs } from "./home-blogs-view";
import { HomeCoursesView } from "./home-courses.view";
import { QuranView } from "./quran-view";
import bgImage from "../../../../public/assets/home_bg.jpg";
import HomePrayerTimingView from "../home-prayer-timings";
import { HomeBlogsSection } from "../home-blogs";
import { MainHomeView } from "../home-main-view";
import { HomeIntroSection } from "../common/home-intro-section";
import HomeQaSection from "./home-qa-section";
import HomeTestimonials from "../home-testimonilas";

export const HomeView = () => {
  return (
    <div>
      <MainHomeView />
      <HomeCoursesView />
      <HomeTestimonials />
      <HomeQaSection />
      {/* <QuranView /> */}
      {/* <HomeBlogsSection /> */}
    </div>
  );
};
