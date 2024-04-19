"use client";

import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { SurahsTabView } from "../quran-tabs/surah-tab";
import { JuzTabView } from "../quran-tabs/juz-tab";
import PageTabView from "../quran-tabs/page-tav";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

enum SortOption {
  Ascending = "Ascending",
  Descending = "Descending",
}

export const QuranView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(SortOption.Ascending);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  const tabs = [
    {
      label: "Surah",
      content: (
        <SurahsTabView searchQuery={searchQuery} sortOption={sortOption} />
      ),
    },
    {
      label: "Juz",
      content: <JuzTabView searchQuery={searchQuery} sortOption={sortOption} />,
    },
    { label: "Page", content: <PageTabView /> },
  ];

  const Tab = ({ label, isActive, onClick }: TabProps) => (
    <button
      className={`${
        isActive
          ? "bg-teal-600 hover:bg-teal-700 text-white border-2 border-teal-600"
          : "text-teal-900 border-2 border-transparent hover:border-teal-600"
      } py-2 md:py-2 md:px-6 px-5 rounded-[70px] outline-none font-medium w-full`}
      onClick={onClick}
    >
      {label}
    </button>
  );
  return (
    <div className="bg-yellow-50 py-11">
      <div className="max-w-6xl px-5 md:px-0 mx-auto py-9 mt-11 md:mt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-teal-900 text-center">
          Quran Mazid
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between mt-11 md:mt-20 gap-3">
          <div className="flex items-center border border-gray-300 p-2 rounded-[50px] gap-2 w-full md:w-auto">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                isActive={index === activeTab}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>
          <div className="border border-gray-300 rounded-[50px] px-2 py-4 w-full md:w-[25rem] relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border-none bg-transparent h-full px-5 w-full"
              placeholder="What do you want to read?"
            />
            <div className="absolute bg-teal-600 rounded-full right-2 h-11 w-11 top-1.5 flex items-center justify-center">
              <Icon
                icon="iconamoon:search-thin"
                className="text-2xl text-white"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-end mt-3">
          <h1 className="text-gray-500">Sort by:</h1>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="outline-none border-none bg-transparent appearence-none text-teal-900 font-bold"
          >
            <option value={SortOption.Ascending}>
              Ascending
              <Icon
                icon="iconamoon:arrow-up-2-thin"
                className="text-3xl  px-2 py-2 outline-none"
              />
            </option>
            <option value={SortOption.Descending}>
              Descending
              <Icon icon="iconamoon:arrow-down-2-thin" className="text-3xl" />
            </option>
          </select>
        </div>

        <div className="mt-11">{tabs[activeTab].content}</div>
      </div>
    </div>
  );
};
