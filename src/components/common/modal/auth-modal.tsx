import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "../../material-tailwind-component/material-tailwind";
import FormProvider from "../../react-hook-form/hook-form-controller";
import { QNXTextField } from "../../react-hook-form";
import {
  useGetUserDataQuery,
  useSignInUserMutation,
} from "@/src/redux/reducer/auth/authApi";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { ZodType, z } from "zod";
import { WEBSITE_LOGIN_PATH, emailRegex } from "@/src/constants/config-global";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setToken } from "@/src/redux/reducer/auth/authSlice";
import toast from "react-hot-toast";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { paths } from "@/src/layouts/paths";
import { ICourse } from "@/src/types/course";
import Link from "next/link";

interface IAuthModal {
  dialog: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface IFormValues {
  email: string;
  password: string;
}

export default function AuthModal({ dialog }: IAuthModal) {
  const [siginIn, { isError, isSuccess }] = useSignInUserMutation();
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [currCourseId, setCurrCourseId] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");
  const { authenticated, user, accessToken } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const storedCourseId = localStorage.getItem("currCourseId");
    if (storedCourseId) {
      setCurrCourseId(storedCourseId);
    }
  }, []);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const schema: ZodType<IFormValues> = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .regex(emailRegex, { message: "Email is not valid" }),
    // password: z.string().regex(passwordRegex,{message: "Password must have 1 uppercase 1 lower case 1 number 1 symbol atleast 8 charecture"}),
    password: z.string({ required_error: "Password is required" }),
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
      setIsLoading(true);
      setErrorMsg("");
      const response = await siginIn({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response.statusCode === 200) {
        dispatch(setToken(response.data.accessToken));
        // const { data, error } = await useGetUserDataQuery();

        toast.success(response.data.message);
        if (
          authenticated &&
          user &&
          user.enrolledCourses?.find(
            (item: ICourse) => item._id === currCourseId
          )
        ) {
          router.push(paths.account.root);
          setIsLoading(false);
        } else {
          router.push(paths.checkout);
          setIsLoading(false);
        }

        reset();
      }
    } catch (error: any) {
      console.log(error, "login error");
      if (error.status === "FETCH_ERROR") {
        setErrorMsg("Internel server error");
      }
      setErrorMsg(typeof error === "string" ? error : error?.data?.message);
      console.log("erroe message", error);
      setIsLoading(false);
    }
  });

  //   if (authenticated && user) {
  //     console.log("auth log");
  //     router.push(returnTo || WEBSITE_LOGIN_PATH);
  //     return <></>;
  //   }
  return (
    <Dialog
      size="xs"
      open={dialog.value}
      handler={dialog.toggle}
      className="bg-transparent shadow-none rounded-3xl"
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card className="mx-auto w-full max-w-[24rem] p-5">
          <CardBody className="flex flex-col gap-5">
            <Typography variant="h4" color="blue-gray">
              Sign In to Quranix
            </Typography>
            {!!errorMsg && (
              <Alert variant="ghost" color="red">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:info-circle-bold" className="text-xl" />
                  <p> {errorMsg}</p>
                </div>
              </Alert>
            )}

            <QNXTextField name="email" label="Email" sx="mt-5" />
            <QNXTextField name="password" label="Password" type="password" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              fullWidth
              loading={isLoading}
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Link href={paths.website.signup}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </FormProvider>
    </Dialog>
  );
}
