"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../../components/material-tailwind-component/material-tailwind";
import { useGetCourseWiseClassQuery } from "@/src/redux/reducer/course/courseApi";

interface ICourseClassProps {
  id: string;
}

export const CourseClassView: React.FC<ICourseClassProps> = ({ id }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVideoId, setCurrentVideoId] = useState("");
  let [lastSeenVideoId, setLastSeenVideoId] = useState<string | null>(null);
  const [isShowTextInstruction, setShowTextInstruction] = useState(true);

  const { data, isLoading } = useGetCourseWiseClassQuery(id);

  useEffect(() => {
    const lastSeenId = localStorage.getItem(`lastSeenVideoId_${id}`);

    setLastSeenVideoId(lastSeenId);
    if (lastSeenId) {
      setShowTextInstruction(false);
    }
  }, [id, isShowTextInstruction, lastSeenVideoId]);

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      if (lastSeenVideoId) {
        setCurrentVideoId(lastSeenVideoId);
        setCurrentVideoIndex(
          data.data.findIndex((video) => video.videoUrl === lastSeenVideoId)
        );
      } else {
        // setCurrentVideoId(data.data[0].videoUrl);
      }
    }
  }, [data, lastSeenVideoId]);

  const handleClassItemClick = (videoId: string, index: number) => {
    setShowTextInstruction(false);
    setCurrentVideoId(videoId);
    setCurrentVideoIndex(index);
    localStorage.setItem(`lastSeenVideoId_${id}`, videoId);
  };

  const handleReset = () => {
    setShowTextInstruction(true);
    localStorage.removeItem(`lastSeenVideoId_${id}`);
    setLastSeenVideoId(null);
    setCurrentVideoId("");
    setCurrentVideoIndex(0);
  };

  const handleNextVideo = () => {
    setShowTextInstruction(false);
    const nextIndex = currentVideoIndex + 1;
    if (data?.data && nextIndex < data.data.length) {
      setCurrentVideoId(data.data[nextIndex].videoUrl);
      setCurrentVideoIndex(nextIndex);
      localStorage.setItem(
        `lastSeenVideoId_${id}`,
        data.data[nextIndex].videoUrl
      );
    }
  };

  const handlePreviousVideo = () => {
    setShowTextInstruction(false);
    const previousIndex = currentVideoIndex - 1;
    if (data?.data && previousIndex >= 0) {
      setCurrentVideoId(data.data[previousIndex].videoUrl);
      setCurrentVideoIndex(previousIndex);
      localStorage.setItem(
        `lastSeenVideoId_${id}`,
        data.data[previousIndex].videoUrl
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-20 md:py-32 ">
      {/* Left side - YouTube video view */}
      <h2 className="text-lg font-semibold pb-2 px-5 xl:px-0">
        {typeof data?.data[0]?.courseId === "string"
          ? data?.data[0]?.courseId
          : data?.data[0]?.courseId.title}
      </h2>

      <div className="flex flex-col lg:flex-row border-t pt-5 ">
        <div className="flex-1">
          <div className="h-52 md:h-[401px] shadow-md sticky mg:block top-20 z-10">
            {isShowTextInstruction ? (
              <div className="text-xl p-5">
                Important Text Instruction read it and know about the course .
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
                allow="autoplay"
              ></iframe>
            )}
          </div>
          <div className="flex justify-end mt-3 border-b pb-3 px-5 xl:px-0">
            <div className=" flex items-center gap-3 py-3 w-full md:w-[19rem]">
              <Button
                variant="outlined"
                className="py-2.5 w-full "
                onClick={handlePreviousVideo}
              >
                Previous
              </Button>
              <Button
                variant="filled"
                className="py-[11px] w-full "
                onClick={handleNextVideo}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/*Right side - Class list*/}
        <div className="lg:w-[25rem] w-full h-[700px] overflow-y-auto pt-5 md:pt-0 px-5">
          <ul className="divide-y divide-gray-200">
            <li
              className={`p-4 mb-4 rounded-md border bg-gray-100 flex items-start gap-2 cursor-pointer hover:bg-gray-200 transition-all duration-300 ${
                isShowTextInstruction && "bg-teal-200 hover:bg-teal-300"
              }`}
              onClick={() => {
                handleReset();
              }}
            >
              <div className="border rounded-md bg-gray-300 px-2 py-1 flex items-center justify-center text-sm">
                #
              </div>
              <h2 className="">
                Text isntruction [Important]: How to follow the lessons and get
                easy methods to learn Quran.
              </h2>
            </li>
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div className="animate-pulse flex w-full" key={index}>
                    <div className="bg-gray-200 h-24 w-full rounded-2xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              data?.data.map((classInfo, index) => (
                <li
                  key={index}
                  className={`p-4 mb-4 rounded-md border bg-gray-100 flex items-start gap-2 cursor-pointer hover:bg-gray-200 transition-all duration-300 ${
                    classInfo.videoUrl === currentVideoId &&
                    !isShowTextInstruction &&
                    "bg-teal-200 hover:bg-teal-300"
                  }`}
                  onClick={() =>
                    handleClassItemClick(classInfo.videoUrl, index)
                  }
                >
                  <div className="border rounded-md bg-gray-300 px-2 py-1 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <h2 className="">{classInfo.title}</h2>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
