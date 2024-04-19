"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/src/components/react-hook-form/hook-form-controller";
import { UserSchema } from "@/src/validation/user";
import QNXOutlineTextField from "@/src/components/react-hook-form/qnx-outline-text-field";
import Image from "next/image";
import { useUpdateUserDataMutation } from "@/src/redux/reducer/auth/authApi";
import { uploadImageOnImgbb } from "@/src/utils/imgbb-image-post";
import toast from "react-hot-toast";
import { IUserItem } from "@/src/types/user";
import { Button } from "../../components/material-tailwind-component/material-tailwind";

export function AccountView() {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const [updateUserData] = useUpdateUserDataMutation();

  const methods = useForm<Partial<IUserItem>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: user?.email && user?.email,
      phone: user?.phone && user?.phone,
      fullName: user?.fullName && user?.fullName,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      if (file !== null) {
        const imgData = await uploadImageOnImgbb(file!);

        const uploadData = { ...data, photo: imgData };

        const response = await updateUserData(uploadData).unwrap();

        if (response.statusCode === 200) {
          toast.success("Data updated successfully");
          setIsLoading(false);
        }
      } else {
        const response = await updateUserData(data).unwrap();

        if (response.statusCode === 200) {
          toast.success("Data updated successfully");
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="p-5 rounded-xl shadow-md bg-white w-full">
      <div className="w-full">
        <div className=" pb-3 w-full flex items-center justify-between border-b-2 border-teal-500 border-dotted">
          <h1 className="font-bold text-[24px] text-qblack">My Profile</h1>
          <Button
            className="rounded border-teal-500 border-2 border-dotted"
            variant="outlined"
            size="sm"
            onClick={handleEditClick}
          >
            <Icon
              icon="fa:edit"
              className="text-xl flex items-center justify-center"
            />
          </Button>
        </div>

        <div className="py-11">
          {isEditing ? (
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
                <div>
                  <h2 className="text-gray-600 flex items-center gap-1">
                    <Icon icon="solar:user-linear" className="text-xl" />
                    Full Name
                  </h2>
                  <QNXOutlineTextField
                    name="fullName"
                    placeholder="Full Name"
                    sx="mt-3"
                  />
                </div>
                <div>
                  <h2 className="text-gray-600 flex items-center gap-1">
                    <Icon icon="oui:email" className="text-xl" />
                    Email Address
                  </h2>
                  <QNXOutlineTextField
                    name="email"
                    placeholder="Email Address"
                    sx="mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <h2 className="text-gray-600 flex items-center gap-1">
                    <Icon
                      icon="solar:sort-from-top-to-bottom-outline"
                      className="text-xl"
                    />
                    Student ID
                  </h2>
                  <QNXOutlineTextField
                    name="userId"
                    placeholder="Student ID"
                    sx="mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <h2 className="text-gray-600 flex items-center gap-1">
                    <Icon icon="line-md:phone-call-loop" className="text-xl" />
                    Mobile Number
                  </h2>
                  <QNXOutlineTextField
                    name="phone"
                    placeholder="Mobile Number"
                    sx="mt-3"
                  />
                </div>
                <div className="flex items-start flex-col">
                  <h2 className="text-gray-600 flex items-center gap-1">
                    <Icon icon="iconoir:profile-circle" className="text-xl" />
                    My Photo
                  </h2>
                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/bmp, image/gif, image/tiff, image/webp, image/heic, image/avif"
                      className="hidden"
                      onChange={handleFileChange}
                      id="banner"
                    />
                    <label
                      htmlFor="banner"
                      className="flex flex-col items-center gap-5"
                    >
                      <div className="avatar-preview border-2 border-gray-300 rounded-full h-11  flex items-center justify-center cursor-pointer px-5 gap-3">
                        <Icon icon="bi:image" className="text-xl" />
                        <span className="text-gray-500">Upload Your Photo</span>
                      </div>
                      {preview ? (
                        <Image
                          src={preview}
                          alt="Preview"
                          className="w-32 h-32  rounded-full"
                          width={500}
                          height={500}
                        />
                      ) : (
                        <div>
                          {typeof user?.photo === "string" && (
                            <Image
                              src={user.photo}
                              alt="User Photo"
                              className="w-32 h-32 rounded-full"
                              width={500}
                              height={500}
                            />
                          )}
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <Button loading={isLoading} type="submit">
                  Save Change
                </Button>
              </div>
            </FormProvider>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
              <div>
                <h2 className="text-gray-600">Full Name</h2>
                <p>
                  {user?.fullName ? user.fullName : "Update your Full Name"}
                </p>
              </div>
              <div>
                <h2 className="text-gray-600">Email Address</h2>
                <p>{user?.email}</p>
              </div>
              <div>
                <h2 className="text-gray-600">Student ID</h2>
                <p>{user?.userId ? user.userId : "QNX-demo1"}</p>
              </div>
              <div>
                <h2 className="text-gray-600">Mobile Number</h2>
                <p>{user?.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
