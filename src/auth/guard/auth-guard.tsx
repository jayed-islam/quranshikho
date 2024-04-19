"use client";

import { SplashScreen } from "@/src/components/common/Loader";
import { paths } from "@/src/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { isValidToken } from "../utils";
import { logOut } from "@/src/redux/reducer/auth/authSlice";

const loginPaths: Record<string, string> = {
  login: paths.signin,
};

interface IAuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: FC<IAuthGuardProps> = ({ children }) => {
  const { authLoading } = useAppSelector((state) => state.auth);
  return (
    <>{authLoading ? <SplashScreen /> : <Container>{children}</Container>}</>
  );
};

function Container({ children }: IAuthGuardProps) {
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

      const loginPath = loginPaths.login;

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
