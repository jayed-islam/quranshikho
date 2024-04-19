"use client";

import React, { useEffect, useState } from "react";
import child_prayer from "../../../public/assets/child_prayer.jpg";
import Image from "next/image";
import {
  Button,
  Option,
  Select,
} from "../../components/material-tailwind-component/material-tailwind";
import prayerline from "../../../public/assets/prayerline.png";
import { Icon } from "@iconify-icon/react";
import { LocationState, PrayerTimesData } from "@/src/types/prayer-time";

export default function HomePrayerTimingView() {
  const [location, setLocation] = useState<LocationState>({
    selectedCity: "Dhaka",
    country: "Bangladesh",
    selectedLatitude: 23.777176,
    selectedLongitude: 90.399452,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [prayerTimesData, setPrayerTimesData] =
    useState<PrayerTimesData | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}`;
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${location.selectedLatitude}&longitude=${location.selectedLongitude}&method=2`
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPrayerTimesData(data);
        } else {
          console.error("Error fetching prayer times.");
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [location.selectedLatitude, location.selectedLongitude]);

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        setIsLoading(true);
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        if (response.ok) {
          const data = await response.json();
          setLocation({
            selectedCity: data.address.city || "Dhaka",
            country: data.address.country || "Bangladesh",
            selectedLatitude: latitude,
            selectedLongitude: longitude,
          });
          setIsLoading(false);
          console.log(data);
        } else {
          console.error("Error getting location details.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setIsLoading(false);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  const formatStartTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${meridiem}`;
  };

  const calculateEndTime = (
    startTime: string,
    nextStartTime: string,
    isSunriseOrSunset: boolean = false
  ): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startTimeInMinutes = hours * 60 + minutes;

    let nextStartTimeInMinutes = 0;

    if (!isSunriseOrSunset) {
      const [nextHours, nextMinutes] = nextStartTime.split(":").map(Number);
      nextStartTimeInMinutes = nextHours * 60 + nextMinutes;
    }

    const buffer = isSunriseOrSunset ? 15 : 1;

    const endTimeInMinutes = isSunriseOrSunset
      ? startTimeInMinutes + buffer
      : nextStartTimeInMinutes - buffer;

    const endTimeHours = Math.floor(endTimeInMinutes / 60);
    const endTimeMinutes = endTimeInMinutes % 60;

    return `${
      endTimeHours > 12 ? endTimeHours - 12 : endTimeHours
    }:${endTimeMinutes.toString().padStart(2, "0")} ${
      endTimeHours >= 12 ? "PM" : "AM"
    }`;
  };

  const selectedPrayerTimes = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
    "Sunset",
  ];
  const titels = ["Name of Salat", "Start Time", "End Time"];

  const prayerTimeCard = (title: String) => (
    <div className="w-full flex items-center justify-center cursor-pointer">
      <h1 className="text-md md:text-lg group-hover:text-orange-400 transition duration-300">
        {title}
      </h1>
    </div>
  );
  return (
    <section className="bg-white">
      <div className="max-w-6xl flex flex-col py-4 mx-auto lg:py-16 lg:flex-row lg:items-center gap-11">
        <div className="flex items-start flex-col w-full md:w-[27rem]">
          <h1 className="text-2xl text-teal-700 text-center">
            Select Country & City For
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mt-2">
            Prayer Timings
          </h1>
          <Image
            className="object-cover w-full h-[21rem] rounded-md mt-16"
            src={child_prayer}
            alt="apple watch photo"
          />
        </div>
        <div className=" flex-1 ">
          <div className="flex items-center gap-3 w-full justify-between">
            <h1>
              Current Location{" "}
              <strong>
                {location.selectedCity}, {location.country}
              </strong>
            </h1>
            <Button
              color="red"
              size="md"
              className="flex items-center gap-2 "
              variant="outlined"
              onClick={handleGetLocation}
              loading={isLoading}
            >
              {!isLoading && (
                <Icon
                  icon="fluent:location-28-filled"
                  className=" text-xl  text-red-500"
                />
              )}
              My Location
            </Button>
          </div>
          <div className="w-full mt-7">
            <div className="flex items-center">
              {titels.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-center flex-col"
                >
                  <h1 className="text-[23px] font-bold">{item}</h1>
                  <Image src={prayerline} alt="prayerline" className="mt-3" />
                </div>
              ))}
            </div>

            <div className="flex  flex-col justify-between gap-5 mt-5">
              {isLoading ? (
                <div>
                  <div className="animate-pulse flex ">
                    <div className="flex-1 flex flex-col gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 gap-4 space-x-5"
                        >
                          <div className="h-2 bg-gray-200 rounded py-4"></div>
                          <div className="h-2 bg-gray-200 rounded py-4"></div>
                          <div className="h-2 bg-gray-200 rounded py-4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                prayerTimesData?.data.timings &&
                selectedPrayerTimes.map((prayerName, index, array) => (
                  <div
                    key={index}
                    className="flex items-center justify-around group"
                  >
                    {prayerTimeCard(prayerName)}
                    {prayerTimeCard(
                      formatStartTime(
                        prayerTimesData?.data.timings[
                          prayerName as keyof typeof prayerTimesData.data.timings
                        ]
                      )
                    )}
                    {index < array.length - 1 &&
                      prayerTimeCard(
                        calculateEndTime(
                          prayerTimesData.data.timings[prayerName],
                          prayerTimesData.data.timings[array[index + 1]],
                          prayerName == "Sunrise" ? true : false
                        )
                      )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
