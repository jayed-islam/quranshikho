"use client";

import Image from "next/image";
import quran from "../../../../public/assets/quran.png";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

export const HomeBlogs = () => {
  const courses = [
    "Quran Intermediate Course brother",
    "Online Quran Classes For Ladies",
    "Hifz Quran (Quran Memorization Course)",
  ];

  const info = [
    {
      length: 20,
      title: "lessons",
    },
    {
      length: 50,
      title: "weeks",
    },
    {
      length: 50,
      title: "enroll",
    },
  ];
  return (
    <div className="py-11 bg-white">
      <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
        <h1 className="text-2xl font-medium text-teal-700 text-center">
          OUR NEWS UPDATES
        </h1>
        <h1 className="max-w-4xl mx-auto text-3xl md:text-4xl lg:text-6xl font-bold text-black text-center mt-2">
          Latest News & Articles From The Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {courses.map((item, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
            >
              <img
                alt="Office"
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
              />

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-7">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Icon icon="basil:chat-outline" className="text-xl" />
                    <h2>03 Comments</h2>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Icon icon="mdi:clock" className="text-xl " />
                    <h2 className="text-gray-700">October 18 2023</h2>
                  </div>
                </div>
                <Link href="#">
                  <h3 className="text-xl font-[600] text-gray-900 hover:text-teal-700 transition duration-200 mt-4">
                    Abandoning Prayer – Why To Avoid At All Costs?
                  </h3>
                </Link>

                <p className="text-[15px] text-gray-400 py-4">
                  There are many variations of lorem class passages of lorem
                  ipsum available online
                </p>

                <div className="border px-3 py-2 rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                      className="h-11 w-11 rounded-full"
                      alt=""
                    />
                    <h1 className="font-medium text-[15px]">Amir Khan</h1>
                  </div>
                  <div className="flex  items-center justify-center py-2 px-5 bg-green-700 text-white hover:bg-yellow-500 hover:text-black font-medium rounded-r-md cursor-pointer transition  duration-300">
                    Read More
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
