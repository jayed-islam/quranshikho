"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import { UserSchema } from "@/src/validation/user";
import QNXOutlineTextField from "@/src/components/react-hook-form/qnx-outline-text-field";
import { useUpdateUserDataMutation } from "@/src/redux/reducer/auth/authApi";
import toast from "react-hot-toast";
import { IUserItem } from "@/src/types/user";
import Button from "@/src/components/qnx-component/button";

export function AccountChangePasswordView() {
  // const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const [updateUserData] = useUpdateUserDataMutation();

  const methods = useForm<Partial<IUserItem>>({
    resolver: zodResolver(UserSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await updateUserData(data).unwrap();

      if (response.statusCode === 200) {
        toast.success("Data updated successfully");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  });

  return (
    <div className="p-5 rounded-xl shadow-md bg-white w-full">
      <div className="w-full">
        <h2 className="text-xl md:text-3xl font-semibold pb-7">
          Change Password
        </h2>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <h2 className="text-gray-600 flex items-center gap-1">
                <Icon icon="solar:user-linear" className="text-xl" />
                Current Password
              </h2>
              <QNXOutlineTextField
                name="password"
                placeholder="Current Password"
                sx="mt-3"
              />
            </div>
            <div>
              <h2 className="text-gray-600 flex items-center gap-1">
                <Icon icon="solar:user-linear" className="text-xl" />
                New Password
              </h2>
              <QNXOutlineTextField
                name="newPassword"
                placeholder="Current Password"
                sx="mt-3"
              />
            </div>
            <div>
              <h2 className="text-gray-600 flex items-center gap-1">
                <Icon icon="solar:user-linear" className="text-xl" />
                Confirm New Password
              </h2>
              <QNXOutlineTextField
                name="confirmNewPassword"
                placeholder="Current Password"
                sx="mt-3"
              />
            </div>
          </div>

          <div className="flex items-end justify-end mt-7">
            <Button loading={isLoading} type="submit" disabled>
              Save Change
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
