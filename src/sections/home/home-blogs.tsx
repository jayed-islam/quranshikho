"use client";

import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { paths } from "@/src/layouts/paths";
import { useGetQlitePostDataQuery } from "@/src/redux/reducer/qlite/qliteApi";
import Image from "next/image";
import { format } from "date-fns";

export const HomeBlogsSection = () => {
  const { data, isLoading } = useGetQlitePostDataQuery();
  console.log(data?.data);

  const formatDate = (createdAt: string) => {
    return format(new Date(createdAt), "MMMM dd, yyyy");
  };
  return (
    <div className="py-11 bg-white">
      <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
        <h1 className="text-2xl font-medium text-teal-700 text-center">
          Latest News & Updates
        </h1>
        <h1 className="max-w-4xl mx-auto text-3xl md:text-4xl lg:text-6xl font-bold text-black text-center mt-2">
          Our Blog & Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {isLoading
            ? [1, 2, 3].map((index) => (
                <div className="border  w-full " key={index}>
                  <div className="animate-pulse flex flex-col">
                    <div className=" bg-gray-200 h-[249px] w-full"></div>
                    <div className="flex-1 p-5">
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="mt-5">
                        <div className="flex flex-col gap-3">
                          <div className="h-3 bg-gray-200 rounded max-w-[171px]"></div>
                          <div className="h-3 bg-gray-200 rounded max-w-[191px]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-4 flex items-center justify-center">
                      <div className="h-3 bg-gray-200 rounded w-40"></div>
                    </div>
                  </div>
                </div>
              ))
            : data?.data.map((item, index) => (
                <Link href={`${paths.blog}/${item._id}`} key={index}>
                  <article className="overflow-hidden  border border-gray-100 bg-white shadow-sm group">
                    <div className="overflow-hidden h-[271px] w-full">
                      <Image
                        alt="Blog"
                        src={item.banner}
                        className="h-[271px] w-full object-cover  group-hover:scale-110 transition duration-200"
                        height={500}
                        width={500}
                      />
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl font-[600] text-gray-900 group-hover:text-teal-700 transition duration-200 ">
                        {item.postInfo.map(
                          (ii, index) =>
                            index === 0 && (
                              <p
                                key={index}
                                className="line-clamp-2 overflow-ellipsis"
                              >
                                {ii}
                              </p>
                            )
                        )}
                      </h3>
                      <div className="flex items-center gap-7 mt-5">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                          <Icon
                            icon="basil:chat-outline"
                            className="text-xl text-teal-700 "
                          />
                          <h2>03 Comments</h2>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm ">
                          <Icon
                            icon="ph:clock"
                            className="text-xl text-teal-700 "
                          />
                          <h2 className="text-gray-700">
                            {formatDate(item.createdAt)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};
