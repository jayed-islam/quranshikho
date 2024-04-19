"use client";

import { Surah } from "@/src/types/quran";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/material-tailwind-component/material-tailwind";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";

interface SurahTabViewProps {
  setIsLeftSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SurahTabView = ({ setIsLeftSideOpen }: SurahTabViewProps) => {
  const [surahs, setSurah] = useState<Surah[]>([]);

  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [verseNumberInput, setVerseNumberInput] = useState<string>("");
  const pathname = usePathname();
  const suraNumberId = pathname.match(/\d+/g);
  const [suraAyahNumber, setSuraAyahNumber] = useState<number>(15);

  const fetchSurahData = async () => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      const surahData: Surah[] = data.data;

      setSurah(surahData);
      setFilteredSurahs(surahData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSurahData();
  }, []);

  useEffect(() => {
    const filtered = surahs.filter((surah) =>
      surah.englishName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSurahs(filtered);
  }, [searchInput, surahs]);

  return (
    <div className="flex items-start gap-3">
      <div className="w-[185px] border-r border-gray-300 pr-3">
        <div className="">
          <input
            type="text"
            placeholder="Search surah"
            className="outline-none w-[169px] bg-gray-100 rounded-md px-3 py-1"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="h-[650px] overflow-y-auto mt-4 gap-2 flex flex-col">
          {filteredSurahs.map((surah, index) => (
            <Link href={`/quran/${surah.number}`} key={index}>
              <Button
                onClick={() => {
                  setSuraAyahNumber(surah.numberOfAyahs);
                  setIsLeftSideOpen((prev: boolean) => !prev);
                }}
                variant="text"
                fullWidth
                className={`flex text-[15px] py-2 px-3 items-start capitalize font-medium gap-3 hover:bg-gray-100 ${
                  surah.number === parseInt(suraNumberId![0])
                    ? "bg-gray-100 font-bold"
                    : ""
                }`}
              >
                <h1>{surah.number}</h1>
                {surah.englishName}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <div>
          <input
            type="text"
            placeholder="Verse"
            className="outline-none w-full bg-gray-100 rounded-md px-3 py-1"
          />
        </div>
        <div className="h-[650px] overflow-y-auto mt-4 gap-2 flex flex-col">
          {Array.from({ length: suraAyahNumber }, (_, index) => index + 1).map(
            (ayahsNumber) => (
              <div key={ayahsNumber}>
                <Button
                  variant="text"
                  fullWidth
                  className="flex text-[15px] py-2 px-3 items-start capitalize font-medium gap-3 hover:bg-gray-100"
                >
                  <h1>{ayahsNumber}</h1>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
