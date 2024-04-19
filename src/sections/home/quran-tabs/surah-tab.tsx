"use client";

import "./styles.css";

import { paths } from "@/src/layouts/paths";
import { Surah } from "@/src/types/quran";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface SurahsTabViewProps {
  searchQuery: string;
  sortOption: string;
}

export const SurahsTabView = ({
  searchQuery,
  sortOption,
}: SurahsTabViewProps) => {
  const [surahs, setSurah] = useState<Surah[]>([]);
  const [showAll, setShowAll] = useState(false);
  const surahsToDisplay = showAll ? surahs.length : 12;
  const [itemsToShow, setItemsToShow] = useState(12);

  const fetchSurahData = async () => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      const surahData: Surah[] = data.data;

      setSurah(surahData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSurahData();
  }, []);

  const handleShowAllClick = useCallback(() => {
    setShowAll(!showAll);
    setItemsToShow(showAll ? 12 : surahs.length);
  }, [showAll, surahs.length]);

  const filteredSurahs = surahs
    .filter((surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, itemsToShow);

  const sortedSurah = filteredSurahs.slice().sort((a, b) => {
    if (sortOption === "Ascending") {
      return a.number - b.number;
    } else {
      return b.number - a.number;
    }
  });

  return (
    <div>
      <div className="mt-11 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
        {sortedSurah?.map((surah, index) => (
          <Link
            href={`/quran/${surah.number}`}
            key={index}
            className="border border-gray-300 rounded-xl px-3 sm:px-5 py-4 sm:py-6 flex items-start justify-between hover:bg-teal-600 group cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <div className="bg-gray-200 group-hover:bg-white rounded h-7 w-7  sm:h-10 sm:w-10 flex items-center justify-center text-teal-900 text-sm sm:text-lg">
                {surah.number}
              </div>
              <div>
                <h1 className=" text-lg sm:text-xl text-teal-900 font-medium group-hover:text-white">
                  {surah.englishName}
                </h1>
                <h2 className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-300">
                  {surah.englishNameTranslation}
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-lg  sm:text-xl lg:text-2xl text-teal-700 group-hover:text-white arabicAyah">
                {surah.name}
              </h1>

              <h2 className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-300">
                {surah.numberOfAyahs} Verces
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-11 flex items-center justify-center">
        <button
          onClick={handleShowAllClick}
          className="bg-teal-600 text-white hover:text-teal-700 hover:bg-transparent border-2 border-teal-500 py-3 px-16 rounded-[70px] text-lg font-medium"
        >
          Show {showAll ? "less" : "all"} Surah
        </button>
      </div>
    </div>
  );
};
