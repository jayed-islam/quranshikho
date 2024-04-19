"use client";

import { QNXTextField } from "@/src/components/react-hook-form";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import { emailRegex } from "@/src/constants/config-global";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, object, z } from "zod";
import {
  Button,
  Alert,
} from "../../components/material-tailwind-component/material-tailwind";
import Link from "next/link";
import { paths } from "@/src/layouts/paths";
import { IUserItem, UserRoles } from "@/src/types/user";
import { useSignUpUserMutation } from "@/src/redux/reducer/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/src/redux/hooks";
import toast from "react-hot-toast";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import quranLearning from "../../../public/images/logo/quran-learning.png";
import Image from "next/image";

interface IFormValues {
  email: string;
  password: string;
  role: string;
}

export default function UserSignUpView() {
  const [signUp, { isLoading, isError, isSuccess }] = useSignUpUserMutation();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const schema = object({
    email: z
      .string({ required_error: "Email is required" })
      .regex(emailRegex, { message: "Email is not valid" }),
    password: z.string(),
    role: z.string().optional(),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log("roles", errors);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const authData = {
      ...data,
      role: UserRoles.user,
    };

    try {
      const response = await signUp(authData).unwrap();

      if (response.statusCode == 200) {
        toast.success(response.message);
        router.push(paths.website.signin);
      }
    } catch (error: any) {
      setErrorMsg(typeof error === "string" ? error : error?.data?.message);
    }
  });
  return (
    <div className="min-h-screen bg-gray-100">
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
              <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
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
                  Sign Up
                </Button>
              </div>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <Link className="text-teal-600 ml-2" href={paths.website.signin}>
                Sigin In
              </Link>
              .
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
