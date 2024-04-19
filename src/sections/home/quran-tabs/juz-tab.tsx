"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Juz {
  juzNumber: number;
  totalAyahsInJuz: number;
  startAyah: string;
  bengaliTranslation: string;
}

interface JuzTabViewProps {
  searchQuery: string;
  sortOption: string;
}

export const JuzTabView = ({ searchQuery, sortOption }: JuzTabViewProps) => {
  const [juzData, setJuzData] = useState<Juz[]>([]);
  const [showAll, setShowAll] = useState(false);
  const surahsToDisplay = showAll ? juzData.length : 12;
  const [itemsToShow, setItemsToShow] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/quran-juz.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the JSON file");
        }

        const data = await response.json();
        setJuzData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowAllClick = useCallback(() => {
    setShowAll(!showAll);
    setItemsToShow(showAll ? 12 : juzData.length);
  }, [showAll, juzData.length]);

  const filteredJuz = juzData
    .filter((juz) =>
      juz.juzNumber.toString().includes(searchQuery.toLowerCase())
    )
    .slice(0, itemsToShow);

  const sortedJuzs = filteredJuz.slice().sort((a, b) => {
    if (sortOption === "Ascending") {
      return a.juzNumber - b.juzNumber;
    } else {
      return b.juzNumber - a.juzNumber;
    }
  });
  return (
    <div>
      <div className="mt-11 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
        {sortedJuzs?.map((juz, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl px-5 py-6 flex items-start justify-between hover:bg-teal-600 group cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <div className="bg-gray-200 group-hover:bg-white rounded h-10 w-10 flex items-center justify-center text-teal-900">
                {juz.juzNumber}
              </div>
              <div>
                <h1 className="text-xl text-teal-900 font-medium group-hover:text-white">
                  {juz.bengaliTranslation}
                </h1>
                <h2 className="text-sm text-gray-700 group-hover:text-gray-300">
                  {juz.totalAyahsInJuz} Verces
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-xl lg:text-2xl font-uthmani text-teal-700 group-hover:text-white font-medium">
                {juz.startAyah}
              </h1>

              {/* <h2 className="text-sm text-gray-700 group-hover:text-gray-300">
                {juz.total_verses} Verces
              </h2> */}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-11 flex items-center justify-center">
        <button
          onClick={handleShowAllClick}
          className="bg-teal-600 text-white hover:text-teal-700 hover:bg-transparent border-2 border-teal-500 py-3 px-16 rounded-[70px] text-lg font-medium"
        >
          Show {showAll ? "less" : "all"} Juz
        </button>
      </div>
    </div>
  );
};
