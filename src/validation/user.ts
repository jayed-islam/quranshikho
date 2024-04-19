import { z } from "zod";
import { emailRegex } from "../constants/config-global";

export const UserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .regex(emailRegex, { message: "Email is not valid" }),
  // password: z.string().regex(passwordRegex,{message: "Password must have 1 uppercase 1 lower case 1 number 1 symbol atleast 8 charecture"}),
  password: z.string().optional(),
  fullName: z.string({ required_error: "Full Name is required" }),
  userId: z.string().optional(),
  phone: z.string({ required_error: "Phone number is required" }),
});

// export const UserPasswordUpdateSchema = z.object({
//   password: z.string({ required_error: "Current Password is required" }),
//   newPassword: z.string({ required_error: "New Password is required" }),
//   confirmNewPassword: z.string({
//     required_error: "Confirm new Password is required",
//   }),
// });

type CheckContext = {
  passwords: {
    newPassword: string;
  };
};

// export const UserPasswordUpdateSchema = z
//   .object({
//     password: z.string({ required_error: "Current Password is required" }),
//     newPassword: z.string({ required_error: "New Password is required" }),
//     confirmNewPassword: z.string({
//       required_error: "Confirm New Password is required",
//       check: (value, ctx: CheckContext) => {
//         return value === ctx.passwords.newPassword || "Passwords do not match";
//       },
//     }),
//   })
//   .refine((data) => data.newPassword === data.confirmNewPassword, {
//     message: "New Password and Confirm New Password must match",
//   });
