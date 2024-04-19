import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";
import { Button } from "../../../components/material-tailwind-component/material-tailwind";

export const HomeIntroSection = () => {
  const info = [
    {
      title: "Best Industry Lecturer",
      link: "",
      icon: "uim:user-md",
    },
    {
      title: "Learn Courses Online",
      link: "",
      icon: "game-icons:graduate-cap",
    },
    {
      title: "Read Quran Online & App",
      link: "",
      icon: "arcticons:quranic",
    },
  ];
  return (
    <div className="grid md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-0 py-7 md:py-0">
      {info.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-7 px-5 py-4 rounded bg-black md:bg-opacity-40 group  group-hover:bg-opacity-70"
        >
          <Icon icon={item.icon} className="text-cyan-500 text-7xl font-bold" />

          <div className="flex flex-col items-start text-white">
            <h1 className="text-xl font-semibold max-w-[151px] text-left">
              {item.title}
            </h1>
            <Button
              variant="text"
              className="px-0 py-2 capitalize text-white flex items-center gap-2"
            >
              View More{" "}
              <Icon icon="gravity-ui:arrow-right" className="text-lg" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
