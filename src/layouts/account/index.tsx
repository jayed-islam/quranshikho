"use client";

import React, { ReactNode, useEffect, useState } from "react";
import AccountSidebar from "./account-sidebar";
import { useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/src/components/common/Loader";

type AccountLayoutProps = {
  children: ReactNode;
};

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (!user || !user.enrolledCourses || user.enrolledCourses.length === 0) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router, user, isLoading]);

  // if (isLoading) {
  //   return <div className="h-[500px] bg-blue-gray-300 w-full"></div>;
  // }

  return (
    <div className="bg-gray-100 py-16 mt-11 md:mt-16 px-5 md:px-0">
      {isLoading ? (
        <SplashScreen />
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-7">
          <div className="md:sticky top-[100px] w-full md:w-[241px]">
            <AccountSidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      )}
    </div>
  );
};

export default AccountLayout;
