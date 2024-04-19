import { z } from "zod";
import { CategoryEnum } from "../types/course";
import { bdMobileRegex, emailRegex } from "../constants/config-global";
import { CourseStatus, CourseType } from "../constants/course";

export const courseCreateSchema = z.object({
  banner: z.string().optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Minimum char is 31" })
    .max(151, { message: "Maximum char is 151" }),
  instructor: z.string({ required_error: "Instructure name is required" }),
  duration: z.string({ required_error: "Duration is required" }),
  price: z
    .number({ required_error: "Price is required" })
    .min(101, { message: "Minimum price is 100" }),
  videoId: z.string().optional(),
  discount: z.string().optional(),
  type: z.enum([CourseType.FREE, CourseType.PAID]),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Minimum is 50" }),
  subDescription: z.string().optional(),
  category: CategoryEnum.nullable().refine((value) => value != null, {
    message: "Category is required",
  }),
  feature: z.array(z.string()),
});

export const courseEditSchema = z.object({
  banner: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "Minimum char is 31" })
    .max(151, { message: "Maximum char is 151" }),
  instructor: z.string(),
  duration: z.string(),
  videoId: z.string(),
  type: z.enum([CourseType.FREE, CourseType.PAID]),
  price: z.number().min(101, { message: "Minimum price is 100" }),
  discount: z.string().optional(),
  description: z.string().min(51, { message: "Minimum is 51" }),
  subDescription: z.string().optional(),
  category: CategoryEnum.nullable().refine((value) => value != null, {
    message: "Category is required",
  }),
  feature: z.array(z.string()),
});

export const checkoutSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .regex(emailRegex, { message: "Please enter a valid email" }),
  fullName: z.string({ required_error: "Full name is required" }),
  phone: z.string().regex(bdMobileRegex, { message: "Phone should be valid" }),
  transactionId: z.string({ required_error: "Transaction ID is required" }),
  methodNumber: z
    .string({ required_error: "Sended mobile number is required" })
    .min(1, { message: "Sent number is required" }),
  status: z
    .enum([
      CourseStatus.ACTIVE,
      CourseStatus.CANCELED,
      CourseStatus.COMPLETED,
      CourseStatus.PENDING,
    ])
    .optional(),
  type: z.enum([CourseType.FREE, CourseType.PAID]).optional(),
});

export const freeCourseCheckoutSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, { message: "Please enter a valid email" }),
  fullName: z.string({ required_error: "Full name is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(bdMobileRegex, { message: "Phone should be valid" }),
  status: z
    .enum([
      CourseStatus.ACTIVE,
      CourseStatus.CANCELED,
      CourseStatus.COMPLETED,
      CourseStatus.PENDING,
    ])
    .optional(),
  type: z.enum([CourseType.FREE, CourseType.PAID]).optional(),
});

export const courseClassCreateSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  courseId: z.string({ required_error: "Course ID is required" }),
  description: z.string({ required_error: "Description is required" }),
  videoDuration: z.string({ required_error: "Video Duration is required" }),
  videoUrl: z.string({ required_error: "Video URL is required" }),
});
