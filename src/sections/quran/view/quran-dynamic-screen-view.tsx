"use client";

import {
  Ayah,
  MergedAyah,
  MergedSurah,
  SuraDetailsResponse,
  SurahDetail,
} from "@/src/types/quran";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import {
  IconButton,
  Progress,
} from "../../../components/material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import AudioPlayer from "./audio-player";

interface QuranScreenProps {
  id: string;
}

type Props = {
  acc: MergedAyah[];
  ayah: Ayah;
};

export function QuranDynamicScreen({ id }: QuranScreenProps) {
  const [surahData, setSurahData] = useState<SurahDetail[]>([]);
  const [language, setLanguage] = useState("en.asad");
  const [isOpen, setIsOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ayahOpenState, setAyahOpenState] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  const handlePlayPauseClick = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,${language}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          const data: SuraDetailsResponse = await response.json();
          setSurahData(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, language]);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioUrl("");
  };

  const handlePlayButtonClick = (ayahNumber: number, number: number) => {
    setIsOpen(true);

    setCurrentAyahIndex(number);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(true);

    setAyahOpenState((prev) => ({
      ...prev,
      [ayahNumber]: !prev[ayahNumber],
    }));

    const dynamicAudioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`;
    setAudioUrl(dynamicAudioUrl);
    setCurrentAyah(ayahNumber);
  };

  const handleTimeUpdate = (currentTime: number) => {
    setCurrentTime(currentTime);
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
  };

  const handlePreviousAyahClick = () => {
    const previousAyahIndex = currentAyahIndex - 1;
    if (previousAyahIndex >= 0) {
      setCurrentAyahIndex(previousAyahIndex);
      const previousAyahNumber = surahData[0]?.ayahs[previousAyahIndex].number;
      const dynamicAudioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${previousAyahNumber}.mp3`;
      setAudioUrl(dynamicAudioUrl);
      setIsPlaying(true);
    }
  };

  const handleNextAyahClick = () => {
    const nextAyahIndex = currentAyahIndex + 1;
    // if (nextAyahIndex < surahData[0]?.ayahs.length) {
    setCurrentAyahIndex(nextAyahIndex);
    const nextAyahNumber = surahData[0]?.ayahs[nextAyahIndex - 1].number;

    const dynamicAudioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${nextAyahNumber}.mp3`;
    setAudioUrl(dynamicAudioUrl);
    setIsPlaying(true);
    // }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newTime = (value / 100) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickX =
      event.clientX - event.currentTarget.getBoundingClientRect().left;
    const progressBarWidth = event.currentTarget.offsetWidth;
    const percentage = (clickX / progressBarWidth) * 100;
    const newTime = (percentage / 100) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
    return formattedTime;
  };

  const padZero = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const Bismillah = (text: string) => {
    const bismillahText = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
    if (text.includes(bismillahText)) {
      return text.replace(bismillahText, "ا۟").trim();
    }
    return text;
  };
  let arabicAyaStyle =
    "\u{FD3F}" + "(getArabicDigitFor(value:verseObj.verseId))" + "\u{FD3E}";

  function getArabicDigitFor(value: number) {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

    const arabicNumber = value
      .toString()
      .split("")
      .map((digit) => arabicDigits[parseInt(digit)])
      .join("");

    return arabicNumber;
  }

  const endOfAyahSymbol = "\u06DD";

  return (
    <div className="">
      {isLoading ? (
        <div className="animate-pulse flex w-full">
          <div className="bg-white h-32 md:h-32 mb-5 w-full rounded-2xl"></div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center justify-center py-9 mb-3">
          <h1 className="text-xl font-semibold">{surahData[0]?.englishName}</h1>
          <h2 className="text-sm text-gray-400 pt-2">
            Ayahs- {surahData[0]?.numberOfAyahs},{surahData[0]?.revelationType}
          </h2>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div>
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div className="animate-pulse flex w-full" key={index}>
                <div className="bg-white h-64 md:h-44 mb-5 w-full rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : (
          surahData[0]?.ayahs.map((ayah, index) => (
            <div key={index} className="w-full bg-white rounded-2xl px-5 py-6 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <IconButton
                    variant="text"
                    onClick={() =>
                      handlePlayButtonClick(ayah.number, ayah.numberInSurah)
                    }
                    className="rounded-full"
                  >
                    <Icon icon="solar:play-outline" className="text-xl" />
                  </IconButton>

                  <IconButton variant="text" className="rounded-full">
                    <Icon icon="solar:bookmark-outline" className="text-lg" />
                  </IconButton>
                  <IconButton variant="text" className="rounded-full">
                    <Icon icon="solar:copy-outline" className="text-lg" />
                  </IconButton>
                  <IconButton variant="text" className="rounded-full">
                    <Icon icon="solar:share-outline" className="text-lg" />
                  </IconButton>
                </div>
                <h1 className="text-teal-700 font-semibold">
                  {surahData[0]?.number}:{ayah.numberInSurah}
                </h1>
              </div>
              <div>
                <h1 className="font-uthmani text-end text-3xl leading-[70px] font-medium ">
                  {Bismillah(ayah.text)}
                  <span className="font-uthmani mr-3 border bg-gray-50 rounded-full ">
                    {getArabicDigitFor(ayah.numberInSurah)}
                  </span>
                </h1>
                <h1 className="text-lg leading-[30px] font-normal text-gray-600 mt-5">
                  {surahData[1]?.ayahs[index].text}
                </h1>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className={`inset-x-0 transition-all duration-500 fixed  mx-auto w-[551px] bg-white rounded-full shadow-[0_4px_34px_rgba(0,0,0,0.15)] px-10 pb-2 pt-0  ${
          isOpen ? " bottom-5" : "bottom-[-131px]"
        }`}
      >
        <div className=" transition-all duration-500 dark:border-slate-500 relative">
          <div className="absolute top-[-20px] right-5 bg-teal-300 text-white w-7 h-7 rounded-full flex items-center  justify-center">
            <button onClick={() => handleClose()} className="mt-1">
              <Icon icon="gridicons:cross" className="" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="px-2 py-1 bg-teal-300 text-white font-medium text-sm rounded-lg">
                Playing:
              </h1>
              <h1 className="text-md mt-1 ">
                {surahData[0]?.englishName} - {currentAyahIndex}
              </h1>
            </div>
            <div className="text-slate-500 transition-all duration-500 dark:bg-slate-600 dark:text-slate-200 flex items-center gap-4 h-20 justify-between">
              <button
                className="hidden sm:block lg:hidden xl:block "
                onClick={handlePreviousAyahClick}
              >
                <Icon
                  icon="solar:skip-previous-bold"
                  className="text-xl inline-block mt-[10px]"
                />
              </button>
              <button
                type="button"
                onClick={handlePlayPauseClick}
                className="bg-white text-slate-900 transition-all dark:bg-slate-100 duration-500 dark:text-slate-700 w-12 h-12 rounded-full shadow-md flex items-center justify-center ring-teal-300 ring-1"
              >
                <Icon
                  icon={isPlaying ? "solar:pause-bold" : "mingcute:play-fill"}
                  className="text-xl"
                />
              </button>
              <button
                onClick={handleNextAyahClick}
                type="button"
                className="hidden sm:block lg:hidden xl:block"
                aria-label="Next"
              >
                <Icon
                  icon="solar:skip-next-bold"
                  className="text-xl h-full mt-[10px]"
                />
              </button>
              <button
                type="button"
                className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-teal-300 text-slate-500 transition-all duration-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
              >
                1x
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-teal-300 transition-all duration-500 dark:text-slate-100">
              {formatTime(currentTime)}
            </div>
            <Progress
              color="teal"
              value={(currentTime / duration) * 100}
              size="lg"
              className="border border-gray-900/10 bg-gray-900/5 p-1"
              onChange={handleProgressChange}
              onClick={handleProgressClick}
            />
            <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">
              {formatTime(duration)}
            </div>
          </div>
        </div>
        <AudioPlayer
          audioUrl={audioUrl}
          audioRef={audioRef}
          isPlaying={isPlaying}
          onPlayPauseClick={handlePlayPauseClick}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onAudioEnd={handleAudioEnd}
        />
      </div>
    </div>
  );
}

// const suraInfo = data.data[0];

// const dataQuranUthmani = data.data[0].ayahs;
// const dataAnotherLanguage = data.data[1].ayahs;

// const formattedData: MergedSurah = dataQuranUthmani.reduce(
//   (acc: MergedSurah, ayah: Ayah) => {
//     const anotherLanguageText = dataAnotherLanguage.find(
//       (text) => text.number === ayah.number
//     )?.text;

//     acc.ayahs.push({
//       number: ayah.number,
//       text: {
//         arabic: ayah.text,
//         another: anotherLanguageText,
//       },
//       numberInSurah: ayah.numberInSurah,
//       juz: ayah.juz,
//       manzil: ayah.manzil,
//       page: ayah.page,
//       ruku: ayah.ruku,
//       hizbQuarter: ayah.hizbQuarter,
//       sajda: ayah.sajda,
//     });

//     return acc;
//   },
//   {
//     name: suraInfo.name,
//     englishName: suraInfo.englishName,
//     englishNameTranslation: suraInfo.englishNameTranslation,
//     number: suraInfo.number,
//     numberOfAyahs: suraInfo.numberOfAyahs,
//     revelationType: suraInfo.revelationType,
//     audio: `https://server8.mp3quran.net/afs/${String(id).padStart(
//       3,
//       "0"
//     )}.mp3`,
//     ayahs: [],
//   }
// );
