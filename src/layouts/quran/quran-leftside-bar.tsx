"use client";

import React, { useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  IconButton,
} from "../../components/material-tailwind-component/material-tailwind";
import { SurahTabView } from "./quran-tabs/sura-tab";
import ParaTabView from "./quran-tabs/para-tab";
import { PageTabView } from "./quran-tabs/page-tab";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
interface Props {
  isScrolled: boolean;
  setIsLeftSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuranLeftSideBar({
  isScrolled,
  setIsLeftSideOpen,
}: Props) {
  const [activeTab, setActiveTab] = useState("surah");

  const quranSection = [
    {
      title: "Surah",
      value: "surah",
      desc: <SurahTabView setIsLeftSideOpen={setIsLeftSideOpen} />,
    },
    {
      title: "Juz",
      value: "juz",
      desc: <ParaTabView />,
    },
    {
      title: "Page",
      value: "page",
      desc: <PageTabView />,
    },
  ];

  return (
    <div className="px-5">
      <Tabs value={activeTab}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center w-full bg-gray-100 rounded-md px-3 py-2 my-4 ">
            {quranSection.map(({ value, title }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`py-[3px] ${
                  activeTab === value ? "rounded-2xl" : ""
                }`}
              >
                {title}
              </Tab>
            ))}
          </div>
        </div>
        <TabsBody className="">
          {quranSection.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="px-0">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
