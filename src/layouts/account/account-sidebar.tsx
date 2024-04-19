import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import { paths } from "../paths";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "../../components/material-tailwind-component/material-tailwind";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logOut } from "@/src/redux/reducer/auth/authSlice";
import toast from "react-hot-toast";

export default function AccountSidebar() {
  const accountSidebar = [
    {
      title: "My Courses",
      icon: "fluent-emoji-high-contrast:classical-building",
      link: paths.account.root,
    },
    {
      title: "Personal Info",
      icon: "iconamoon:profile-fill",
      link: paths.account.me,
    },
    // {
    //   title: "Payment Method",
    //   icon: "material-symbols:payments-rounded",
    //   link: "drt",
    // },
    {
      title: "Chnage Password",
      icon: "teenyicons:password-solid",
      link: paths.account.changePassword,
    },
    // {
    //   title: "Logout",
    //   icon: "solar:logout-2-bold",
    //   link: "rt",
    // },
  ];

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
    toast.success("Logout successfully done");
  };

  return (
    <div className="bg-white px-3 w-full md:w-[241px] py-7 rounded-xl shadow-md min-h-[500px]">
      <div className="w-full pl-2 flex justify-between items-center flex-col">
        <Avatar
          src={user?.photo != "" ? user?.photo : ""}
          alt="avatar"
          size="xl"
        />
        {user?.fullName != null && (
          <h1 className="text-xl font-bold ">{user?.fullName}</h1>
        )}
        <h2 className="text-sm font-medium">QNX-1501</h2>
        <p className="text-sm">{user?.email}</p>
        <p className="text-sm border-b border-dashed pb-5 w-full flex items-center justify-center border-gray-400">
          {user?.phone}
        </p>
      </div>
      <div className="mt-8 w-full">
        <div className="flex flex-col space-y-4 w-full">
          {accountSidebar.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className={`group hover:bg-gray-100 w-full rounded-lg px-3 py-3 ${
                pathname === item.link && "bg-gray-100"
              }`}
            >
              <div className="flex space-x-3 items-center">
                <Icon icon={item.icon} className="text-xl text-teal-600" />
                <span className=" font-normal text-base">{item.title}</span>
              </div>
            </Link>
          ))}
          <div
            className={`group hover:bg-gray-100 w-full rounded-lg px-3 py-3 cursor-pointer`}
            onClick={handleLogout}
          >
            <div className="flex space-x-3 items-center">
              <Icon
                icon="solar:logout-2-bold"
                className="text-xl text-teal-600"
              />
              <span className=" font-normal text-base">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
