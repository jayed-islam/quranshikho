"use client";

import { useGetSingleQlitePostItemQuery } from "@/src/redux/reducer/qlite/qliteApi";
import Image from "next/image";
import React from "react";

interface BlogDetailsPageProps {
  id: string;
}

const BlogDetailView = ({ id }: BlogDetailsPageProps) => {
  const { data, isLoading } = useGetSingleQlitePostItemQuery(id);

  // const { author, banner, postInfo } = data?.data!;
  return (
    <div className="mt-20 bg-gray-50 ">
      {isLoading ? (
        <div></div>
      ) : (
        <div className="mt-6 max-w-6xl mx-auto">
          <div className="px-5 py-6 mx-auto">
            <div className="py-6 bg-gray-50">
              <div className="h-full w-full overflow-hidden">
                <div className="transition duration-200 ease-out transform hover:scale-110">
                  <img
                    alt=""
                    className="object-cover w-full shadow-sm h-full"
                    src={data?.data.banner}
                  />
                </div>
              </div>

              <div className="mt-2">
                {/* <!--post heading--> */}
                <p className="mt-5 sm:text-xl md:text-2xl xl:text-3xl font-semibold text-purple-500  ">
                  {data?.data.postInfo.map(
                    (ii, index) =>
                      index === 0 && (
                        <p
                          key={index}
                          className="line-clamp-3 overflow-ellipsis"
                        >
                          {ii}
                        </p>
                      )
                  )}
                </p>

                {/* <!--post views--> */}
                <div className="flex justify-start items-center mt-2">
                  <p className="text-sm text-green-500 font-bold bg-gray-100 rounded-full py-2 px-2 hover:text-red-500">
                    3000
                  </p>
                  <p className="text-sm text-gray-400 font-bold ml-5">Views</p>
                </div>

                {/* <!--author avator--> */}
                <div className="font-light text-gray-600">
                  <a href="#" className="flex items-center mt-6 mb-6">
                    <img
                      src="https://avatars.githubusercontent.com/u/71964085?v=4"
                      alt="avatar"
                      className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                    />
                    <h1 className="font-bold text-gray-700 hover:underline">
                      Deenly
                    </h1>
                  </a>
                </div>
              </div>

              {/* <!--end post header-->
                        <!--post content--> */}
              {data?.data.postInfo.map((item, index) => (
                <div
                  key={index}
                  className="max-w-4xl px-10  mx-auto text-lg md:text-xl text-gray-700 mt-4 rounded bg-gray-100"
                >
                  {/* <!--content body--> */}
                  <div>
                    <p className="mt-2 p-8">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* <!--related posts--> */}
            {/* <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">
              Related Posts
            </h2>
            <div className="flex grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
              <div className="grid grid-cols-12 col-span-12 gap-7">
                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                  <a
                    href="#_"
                    className="block transition duration-200 ease-out transform hover:scale-110"
                  >
                    <img
                      className="object-cover w-full shadow-sm h-full"
                      src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
                    />
                  </a>
                  <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                    <div className="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                      <span>Flask</span>
                    </div>
                    <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                      <a href="#_">
                        Oauth using facebook with flask,mysql,vuejs and tailwind
                        css
                      </a>
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                  <a
                    href="#_"
                    className="block transition duration-200 ease-out transform hover:scale-110"
                  >
                    <img
                      className="object-cover w-full shadow-sm h-full"
                      src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
                    />
                  </a>
                  <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                    <div className="bg-red-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                      <span>Django</span>
                    </div>
                    <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                      <a href="#_">
                        Authenticating users with email verification in Django
                        apps
                      </a>
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                  <a
                    href="#_"
                    className="block transition duration-200 ease-out transform hover:scale-110"
                  >
                    <img
                      className="object-cover w-full shadow-sm h-full"
                      src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
                    />
                  </a>
                  <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                    <div className="bg-purple-500 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                      <span>Flask</span>
                    </div>
                    <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                      <a href="#_">
                        Creating user registration and authentication system in
                        flask
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailView;
