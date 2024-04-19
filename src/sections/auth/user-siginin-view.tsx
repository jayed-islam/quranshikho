"use client";

import { QNXTextField } from "@/src/components/react-hook-form";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import {
  WEBSITE_LOGIN_PATH,
  emailRegex,
  passwordRegex,
} from "@/src/constants/config-global";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, object, z } from "zod";
import {
  Alert,
  Button,
} from "../../components/material-tailwind-component/material-tailwind";
import Link from "next/link";
import { paths } from "@/src/layouts/paths";
import { IUserItem } from "@/src/types/user";
import {
  useGetUserDataQuery,
  useSignInUserMutation,
} from "@/src/redux/reducer/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "@/src/redux/reducer/auth/authSlice";
import toast from "react-hot-toast";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import quranLearning from "../../../public/images/logo/quran-learning.png";
import Image from "next/image";
interface IFormValues {
  email: string;
  password: string;
}

export default function UserSignInView() {
  const [siginIn, { isLoading, isError, isSuccess }] = useSignInUserMutation();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");
  const { authenticated, user, accessToken } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const router = useRouter();

  const schema: ZodType<IFormValues> = object({
    email: z
      .string({ required_error: "Email is required" })
      .regex(emailRegex, { message: "Email is not valid" }),
    // password: z.string().regex(passwordRegex,{message: "Password must have 1 uppercase 1 lower case 1 number 1 symbol atleast 8 charecture"}),
    password: z.string(),
  });
  const methods = useForm<IFormValues>({
    resolver: zodResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg("");
      const response = await siginIn({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response.statusCode === 200) {
        dispatch(setToken(response.data.accessToken));
        // localStorage.setItem("accessToken", response.data.accessToken);
        toast.success(response.data.message);
        // router.push(returnTo || WEBSITE_LOGIN_PATH);
        reset();
      }
    } catch (error: any) {
      console.log(error, "login error");
      if (error.status === "FETCH_ERROR") {
        setErrorMsg("Internel server error");
      }
      setErrorMsg(typeof error === "string" ? error : error?.data?.message);
      console.log("erroe message", error);
    }
  });

  if (authenticated && user) {
    console.log("auth log");
    router.push(returnTo || WEBSITE_LOGIN_PATH);
    return <></>;
  }

  return (
    <div className="bg-gray-100  min-h-screen">
      <div className="max-w-6xl mx-auto py-9 md:pt-11 md:pb-20 flex items-center justify-between">
        <Link href="/">
          <Image src={quranLearning} alt="" className="w-20 md:w-40" />
        </Link>
        <Link href="/" className="text-lg hover:underline hover:text-teal-600">
          Ask Qurstion!!
        </Link>
      </div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className=" flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign In</h1>
              <div className="flex flex-col gap-4">
                {!!errorMsg && (
                  <Alert variant="ghost" color="red">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:info-circle-bold" className="text-xl" />
                      <p> {errorMsg}</p>
                    </div>
                  </Alert>
                )}
                <QNXTextField
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Email"
                />

                <QNXTextField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                <Button
                  type="submit"
                  className="w-full text-center transition duration-300 py-3 rounded bg-teal-600 text-white hover:bg-teal-700 focus:outline-none my-1 capitalize"
                >
                  Sign In
                </Button>
              </div>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <Link
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </Link>{" "}
                and
                <Link
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="text-grey-dark mt-6">
              Don&apos;t have an account?
              <Link className="text-teal-600 ml-2" href={paths.website.signup}>
                Sigin up
              </Link>
              .
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
