import { z } from "zod";

export const CategoryEnum = z.enum([
  "Quran",
  "Hadith",
  "Science",
  "History",
  "Programming",
  "Hadith",
]);

export const EnrollStatus = z.enum([
  "active",
  "completed",
  "pending",
  "canceled",
]);

export const courseType = z.enum(["free", "paid"]);

export interface ICourseClass {
  _id?: string;
  courseId: string | Partial<ICourse>;
  title: string;
  description: string;
  videoUrl: string;
  videoDuration: string;
}

export interface ICourse {
  _id: string;
  banner: string;
  title: string;
  instructor: string;
  duration: string;
  price: number;
  videoId?: string;
  discount: string;
  description: string;
  subDescription?: string | null;
  category: z.infer<typeof CategoryEnum>;
  feature: string[];
  createdAt: Date;
  type?: String;
}

export interface ICourseCheckout {
  userId: string;
  courseId: string;
  phone: string;
  fullName: string;
  status: z.infer<typeof EnrollStatus>;
  payment: string;
  paymentMethods: "nagad" | "rocket";
  paymentMobileNumber: string;
  transactionId: string;
  type: "free" | "paid";
}

export const COURSE_CATEGORY = [
  { label: "Quran", value: "Quran" },
  { label: "Hadith", value: "Hadith" },
  { label: "Science", value: "Science" },
  { label: "History", value: "History" },
  { label: "Programming", value: "Programming" },
];

export const COURSE_TYPE = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

export const FOUNDATIONS = [
  { label: "Shahada", value: "shahada" },
  { label: "Solat", value: "solat" },
  { label: "Sowm", value: "sowm" },
  { label: "Hajj", value: "hajj" },
  { label: "Zakat", value: "zakat" },
];

export const HIJRIDATE_METHOD = [
  { label: "Increase", value: "increase" },
  { label: "Decrease", value: "decrease" },
];

export const HOW_MANY_DAYS = [
  { label: "1 Day", value: "1" },
  { label: "2 Days", value: "2" },
  { label: "3 Days", value: "3" },
];
