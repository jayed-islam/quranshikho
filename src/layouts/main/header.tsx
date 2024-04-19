"use client";

import React, { useEffect, useState } from "react";
import { mainMenuItems } from "./config-navigation";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import { paths } from "../paths";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "../../components/material-tailwind-component/material-tailwind";
import { useAppSelector } from "@/src/redux/hooks";
import { UserRoles } from "@/src/types/user";
import ProfileMenu from "@/src/components/common/profile-menu";
import { usePathname } from "next/navigation";
import useBoolean from "@/src/hooks/use-boolean";
import SupportSessionDialog from "@/src/components/common/modal/support-session-modal";
import learnQuran from "../../../public/images/logo/quran-learning.png";
import quran from "../../../public/assets/quran.png";
import Image from "next/image";

export default function Header() {
  const { authenticated, user } = useAppSelector((state) => state.auth);
  const websiteRoles: string[] = [UserRoles.user, UserRoles.admin];

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const supportSession = useBoolean();

  const handleScroll = () => {
    setScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  const isIncluded: boolean =
    pathname.includes("checkout") ||
    pathname.includes("course") ||
    pathname.includes("account") ||
    pathname.includes("my-classes") ||
    pathname.includes("quran-mazid") ||
    pathname.includes("blog");

  return (
    <header
      className={`fixed top-0 z-20 w-full transition   ${
        scrolled
          ? "bg-white border-b border-gray-300 "
          : !isIncluded
          ? "bg-black bg-opacity-30 border-b border-gray-700"
          : "bg-white border-b border-gray-300"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-0 py-1">
        <div className="flex items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={learnQuran}
                alt=""
                height={500}
                width={500}
                className="rounded-md w-32 md:w-40 bg-white p-1"
              />
            </Link>
          </div>

          {/*modile menu section designed with sidebar*/}
          <div
            className={`lg:hidden absolute left-0 z-10 bg-white h-screen duration-200 transition-all ${
              isOpen
                ? "translate-x-0 top-0 left-0 w-full"
                : "-translate-x-full top-0 left-0"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-3">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsOpen((prev: boolean) => !prev)}
              >
                <Image
                  src={learnQuran}
                  alt=""
                  height={500}
                  width={500}
                  className="rounded-md w-32 md:w-40 bg-white p-1"
                />
              </Link>
              <IconButton
                variant="text"
                className="rounded-full"
                onClick={() => setIsOpen((prev: boolean) => !prev)}
              >
                <Icon icon="ci:close-lg" className={`text-2xl`} />
              </IconButton>
            </div>
            <div className="flex items-left flex-col gap-1 text-md px-5 mt-7">
              {mainMenuItems.map((item, index) => (
                <Link href={item.route} key={index} className="w-full">
                  <Button
                    variant="text"
                    className="group text-left relative capitalize text-md hover:text-teal-600 w-full rounded-none border-b"
                    onClick={() => setIsOpen((prev: boolean) => !prev)}
                  >
                    {item.text}
                    {item.subItems && (
                      <Icon icon="ep:arrow-down" className="ml-2" />
                    )}
                  </Button>
                </Link>
              ))}
              {!user?.email && (
                <Link className="w-full" href={paths.website.signin}>
                  <Button
                    variant="text"
                    className="group relative capitalize text-md text-md hover:text-teal-600 w-full text-left rounded-none border-b"
                    onClick={() => setIsOpen((prev: boolean) => !prev)}
                  >
                    Login
                  </Button>
                </Link>
              )}
              {user?.enrolledCourses && user?.enrolledCourses?.length > 0 && (
                <Link className="w-full" href={paths.myClases.root}>
                  <Button
                    variant="text"
                    className="group relative capitalize text-md hover:text-teal-600 w-full text-left rounded-none border-b"
                    onClick={() => setIsOpen((prev: boolean) => !prev)}
                  >
                    My Classes
                  </Button>
                </Link>
              )}

              {user?.enrolledCourses && user?.enrolledCourses?.length > 0 && (
                <Button
                  size="sm"
                  variant="text"
                  className="group relative capitalize text-md hover:text-teal-600 w-full text-left rounded-none border-b"
                  onClick={() => {
                    setIsOpen((prev: boolean) => !prev);
                    supportSession.setTrue();
                  }}
                >
                  Support
                </Button>
              )}

              <Link
                href={paths.website.quranMazid}
                className="mt-5"
                onClick={() => setIsOpen((prev: boolean) => !prev)}
              >
                <Button
                  variant="filled"
                  className={`capitalize text-white bg-[#00ab55] flex items-center p-0 px-3 text-md md:text-lg`}
                >
                  <Image src={quran} alt="" className="w-9 md:w-11" />
                  Quran Mazid
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <nav aria-label="Global">
              <ul className="flex items-center  text-md">
                {mainMenuItems.map((item, index) => (
                  <li key={index} className="group relative py-3">
                    <Link href={item.route}>
                      <Button
                        size="sm"
                        variant="text"
                        className={` flex items-center capitalize font-medium text-sm ${
                          scrolled
                            ? "text-black"
                            : isIncluded
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.text}
                        {item.subItems && (
                          <Icon icon="ep:arrow-down" className="ml-2" />
                        )}
                      </Button>
                    </Link>
                    {item.subItems &&
                      (!scrolled ? (
                        <ul className="absolute left-[-51px] mt-5 bg-black bg-opacity-50 p-2 shadow-lg w-[200px] rounded-xl border border-gray-400  invisible group-hover:visible ">
                          {item.subItems.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="text-gray-500 transition hover:text-black py-2 px-3 rounded-md hover:bg-gray-100 hover:bg-opacity-50 "
                            >
                              <Link href={subItem.route}>{subItem.text}</Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="absolute left-[-51px] mt-5 bg-white p-2 shadow-lg invisible group-hover:visible w-[200px] rounded-xl border border-gray-400">
                          {item.subItems.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="text-gray-500 transition hover:text-gray-500/75 py-2 px-3 rounded-md hover:bg-gray-100"
                            >
                              <Link href={subItem.route}>{subItem.text}</Link>
                            </li>
                          ))}
                        </ul>
                      ))}
                  </li>
                ))}
                {!user?.email && (
                  <Link href={paths.website.signin}>
                    <li
                      className={` flex items-center capitalize font-medium text-sm pl-5 ${
                        scrolled
                          ? "text-black"
                          : isIncluded
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      Login
                    </li>
                  </Link>
                )}
                {user?.enrolledCourses && user?.enrolledCourses?.length > 0 && (
                  <li>
                    <Link href={paths.myClases.root}>
                      <Button
                        size="sm"
                        variant="text"
                        className={` flex items-center capitalize font-medium text-sm ${
                          scrolled
                            ? "text-black"
                            : isIncluded
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        My Classes
                      </Button>
                    </Link>
                  </li>
                )}
                {user?.enrolledCourses && user?.enrolledCourses?.length > 0 && (
                  <li>
                    <Button
                      onClick={supportSession.setTrue}
                      size="sm"
                      variant="text"
                      className={` flex items-center capitalize font-medium text-sm ${
                        scrolled
                          ? "text-black"
                          : isIncluded
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      Support
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          <div className="flex items-center ">
            <div className=" lg:flex items-center lg:gap-5 hidden">
              <Link href={paths.website.quranMazid}>
                <Button
                  variant="filled"
                  className={`capitalize text-white bg-[#00ab55] flex items-center p-0 px-3 text-md md:text-lg`}
                >
                  <Image src={quran} alt="" className="w-9 md:w-11" />
                  Quran Mazid
                </Button>
              </Link>

              {authenticated && <ProfileMenu />}
            </div>

            <div className="flex lg:hidden">
              <IconButton
                variant="text"
                className="rounded-full"
                onClick={() => setIsOpen((prev: boolean) => !prev)}
              >
                <Icon
                  icon="ri:menu-2-line"
                  className={`text-2xl ${
                    scrolled
                      ? "text-blue-gray-900"
                      : `${isIncluded ? "text-teal-700" : "text-white"}`
                  }`}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <SupportSessionDialog dialog={supportSession} />
    </header>
  );
}
