import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import {
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
} from "../material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { paths } from "@/src/layouts/paths";
import Link from "next/link";
import { logOut } from "@/src/redux/reducer/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Profile } from "./profile";

const ProfileMenu = () => {
  const dispatch = useAppDispatch();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
            ${open ? "text-white" : "text-white/90"}`}
          >
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <Icon
                icon="material-symbols-light:keyboard-arrow-down"
                className={`text-xl transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Button>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute  z-10 mt-2 w-screen max-w-[251px] right-0 transform px-4 sm:px-0 rounded-2xl">
              {({ close }) => <Profile close={close} />}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ProfileMenu;
