import { api } from "../../api";
import { ICourse, ICourseCheckout, ICourseClass } from "../../../types/course";
import { setCourseLoading, setCourses, setSingleCourse } from "./courseSlice";

interface ICourseInfo {
  label: string;
  value: string;
}

interface ICourseSelectionData {
  data: ICourseInfo[];
  statusCode: number;
}

interface ICourseWiseClassData {
  data: ICourseClass[];
  statusCode: number;
}

interface ICourseResponse {
  data: ICourse[];
  statusCode: number;
}
interface ICoursePostResponse {
  statusCode: number;
  id: String;
}

interface ICourseClassPostResponse {
  statusCode: number;
  id?: string;
  message: string;
}

interface ICourseCheckoutResponse {
  statusCode: number;
  message: string;
}

interface ISingleCourseResponse {
  data: ICourse;
  statusCode: number;
}

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourseData: builder.query<ICourseResponse, void>({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setCourseLoading(true));
        try {
          const { data } = await queryFulfilled;
          if (data.statusCode === 200) {
            dispatch(setCourseLoading(false));
            dispatch(setCourses(data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["courses"],
      // keepUnusedDataFor: 50000
    }),
    getCourseSelectionData: builder.query<ICourseSelectionData, void>({
      query: () => ({
        url: "/course/getcoursedata",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setCourseLoading(true));
        try {
          const { data } = await queryFulfilled;
          if (data.statusCode === 200) {
            dispatch(setCourseLoading(false));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getCourseWiseClass: builder.query<ICourseWiseClassData, string>({
      query: (id: string) => ({
        url: `/classes/getclasses/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setCourseLoading(true));
        try {
          const { data } = await queryFulfilled;
          // if (data.statusCode === 200) {
          //   dispatch(setCourseLoading(false));
          // }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["CourseClass"],
    }),
    getSingleCourse: builder.query<ISingleCourseResponse, String>({
      query: (id: String) => ({ url: `/course/getone/${id}`, method: "GET" }),
      providesTags: ["course"],
    }),
    courseCheckoutSubmit: builder.mutation<
      ICourseCheckoutResponse,
      Partial<ICourseCheckout>
    >({
      query: (checkoutData) => ({
        url: "/course/enroll",
        method: "POST",
        body: checkoutData,
      }),
      async onQueryStarted(checkoutData, { dispatch, queryFulfilled }) {
        try {
          const course = await queryFulfilled;
        } catch (error) {
          console.error("Failed to post new course:", error);
        }
      },
      // invalidatesTags: ["courses"],
      invalidatesTags: ["user-me"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCourseDataQuery,
  useGetSingleCourseQuery,
  useCourseCheckoutSubmitMutation,
  useGetCourseSelectionDataQuery,
  useGetCourseWiseClassQuery,
} = courseApi;
