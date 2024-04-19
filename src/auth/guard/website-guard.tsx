"use client";

import { paths } from "@/src/layouts/paths";
import { FC, useCallback, useEffect, useState } from "react";
import { isValidToken } from "../utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logOut } from "@/src/redux/reducer/auth/authSlice";
import { SplashScreen } from "@/src/components/common/Loader";

interface IWebsiteGuardProps {
  children: React.ReactNode;
}

export const WebsiteGuard: FC<IWebsiteGuardProps> = ({ children }) => {
  const { authLoading } = useAppSelector((state) => state.auth);
  return (
    <>{authLoading ? <SplashScreen /> : <Container>{children}</Container>}</>
  );
};

function Container({ children }: IWebsiteGuardProps) {
  const { authenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  let accessToken: string | null = null;

  if (typeof window === "object") {
    accessToken = localStorage?.getItem("accessToken");
  }

  const dispatch = useAppDispatch();

  const check = useCallback(() => {
    if (!authenticated) {
      if (accessToken) {
        if (!isValidToken(accessToken)) {
          dispatch(logOut());
        }
      }
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = paths.website.signin;

      const href = `${loginPath}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, accessToken, router, dispatch]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
