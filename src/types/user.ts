import { ICourse } from "./course";

export interface IUserItem {
  email: string;
  password: string;
  role: UserRoles;
  fullName: string | "";
  phone: string | "";
  photo: string | "";
  userId?: string;
  enrolledCourses?: ICourse[] | null;
  _id: string | "";
}

export enum UserRoles {
  admin = "admin",
  user = "user",
  superAdmin = "superAdmin",
}

export interface IAuthor {
  email: string;
  password: string;
  role: UserRoles;
  fullName: string | "";
  phone: string | "";
  photo: string | File | "";
  userID?: string;
  enrolledCourses?: ICourse[] | null;
  _id: string | "";
}
