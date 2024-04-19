import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/`,
    prepareHeaders: async (headers, { endpoint }) => {
      const accessToken = localStorage?.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "user-me",
    "signInUser",
    "courses",
    "course",
    "Lecture",
    "QliteStory",
    "HijriDate",
    "CourseClass",
    "Qlite",
    "RecentSubject",
  ],
  endpoints: () => ({}),
});

// export const {} = api;
