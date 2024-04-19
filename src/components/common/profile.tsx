import { paths } from "@/src/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logOut } from "@/src/redux/reducer/auth/authSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface ProfileProps {
  close: () => void;
}

export const Profile = ({ close }: ProfileProps) => {
  const dispatch = useAppDispatch();
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: "solar:user-rounded-outline",
      link: paths.account.root,
    },
    {
      label: "Edit Profile",
      icon: "mingcute:user-edit-line",
      link: paths.account.me,
    },
    {
      label: "Help",
      icon: "solar:help-outline",
      link: "",
    },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
    toast.success("Logout successfully done");
  };

  return (
    <div>
      <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
          <div className="flex items-center space-x-3">
            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-12 h-12 ring-1 ring-white dark:ring-neutral-900">
              <img
                alt="John Doe"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                sizes="100px"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <span className="wil-avatar__name">J</span>
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold">{user?.fullName}</h4>
              <p className="text-xs mt-0.5">{user?.userId}</p>
            </div>
          </div>

          {authenticated &&
          user?.enrolledCourses &&
          user.enrolledCourses.length > 0 ? (
            profileMenuItems.map((item, index) => (
              <Link
                href={item.link}
                onClick={close}
                key={index}
                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                  <Icon icon={item.icon} className="text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium ">{item.label}</p>
                </div>
              </Link>
            ))
          ) : (
            <Link
              href="#courses"
              onClick={close}
              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
            >
              <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                <Icon icon="streamline:quality-education" className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium ">See Courses</p>
              </div>
            </Link>
          )}

          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div
            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15 12H3.62"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium ">Disconnect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
