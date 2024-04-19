"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { QuranHeader } from "./quran-header";
import QuranLeftSideBar from "./quran-leftside-bar";
import QuranRightSideBar from "./quran-rightside-bar";

type QuranMainLayoutProps = {
  children: ReactNode;
};

const QuranMainLayout = ({ children }: QuranMainLayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeftSideOpen, setIsLeftSideOpen] = useState(false);
  const [isRightSideOpen, setIsRightSideOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <QuranHeader
        isScrolled={isScrolled}
        setIsLeftSideOpen={setIsLeftSideOpen}
        setIsRightSideOpen={setIsRightSideOpen}
      />
      {/* <div className="h-3.5 bg-gray-200 w-full fixed top-[63px]"></div> */}
      <div className="flex lg:ml-[333px] 2xl:mr-[333px] min-h-screen rounded-t-2xl mt-3 ">
        {/* <div
          className={`fixed top-[78px] left-3 h-screen overflow-y-auto w-[320px] bg-white z-20 rounded-t-2xl   ${} `}
        >
          <QuranLeftSideBar isScrolled={isScrolled} />
        </div> */}
        <div
          className={`fixed top-[78px] h-screen left-0 lg:left-3 overflow-y-auto bg-white z-20 rounded-t-2xl w-[321px] transition-all duration-200 lg:translate-x-0 ${
            isLeftSideOpen
              ? "translate-x-0 left-3 border-r shadow-md"
              : "-translate-x-[351px]"
          }`}
        >
          <QuranLeftSideBar
            isScrolled={isScrolled}
            setIsLeftSideOpen={setIsLeftSideOpen}
          />
        </div>

        <div className="flex-grow mx-4">{children}</div>
        {/* <div className="fixed top-[78px] right-3 h-screen overflow-y-auto w-[320px] bg-white z-20 rounded-t-2xl">
          <QuranRightSideBar />
        </div> */}
        {/* <div className="fixed top-[78px] right-3 h-screen overflow-y-auto bg-white z-20 rounded-t-2xl">
          <div
            className={`w-[320px] xl:w-full ${
              isRightSideOpen ? "xl:translate-x-0" : "-translate-x-full"
            }`}
          >
            <QuranRightSideBar />
          </div>
        </div> */}
        <div
          className={`fixed top-[78px] h-screen right-0 lg:right-3 overflow-y-auto bg-white z-20 rounded-t-2xl w-[321px] transition-all duration-200 2xl:translate-x-0 ${
            isRightSideOpen ? "translate-x-0" : "translate-x-[351px]"
          }`}
        >
          <QuranRightSideBar />
        </div>
      </div>
    </div>
  );
};

export default QuranMainLayout;
