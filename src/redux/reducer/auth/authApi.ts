import { IUserItem } from "@/src/types/user";
import { api } from "../../api";
import { setAuthLoading, setUser } from "./authSlice";

interface ILoginResponse {
  statusCode: number | string;
  data: {
    accessToken: string;
    message: string;
  };
}

interface ISignUpResponse {
  statusCode: number | string;
  message: string;
}

interface IGetSingleUserResponse {
  statusCode: number;
  data: IUserItem;
}

interface IUpdateUserDataResponse {
  statusCode: number;
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signInUser: builder.mutation<ILoginResponse, Partial<IUserItem>>({
      query: (body: IUserItem) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      // providesTags: ["User"],
      invalidatesTags: ["user-me"],
    }),
    signUpUser: builder.mutation<ISignUpResponse, Partial<IUserItem>>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user-me"],
    }),
    getUserData: builder.query<IGetSingleUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["user-me"],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setAuthLoading(true));
        try {
          const { data } = await queryFulfilled;
          if (data.data) {
            const updatedData: IUserItem = Object.fromEntries(
              Object.entries(data.data).filter(
                ([_, value]) => value !== null && value != undefined
              )
            ) as IUserItem;
            dispatch(setUser(updatedData));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUserData: builder.mutation<
      IUpdateUserDataResponse,
      Partial<IUserItem>
    >({
      query: ({ _id, ...body }) => ({
        url: `/auth/update/me`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ _id, ...body }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // courseApi.util.updateQueryData(
          //   "getSingleCourse",
          //   _id as string,
          //   (draft) => {
          //     draft.data = data?.data;
          //   }
          // );
        } catch (error) {
          console.error("Failed to update user data:", error);
        }
      },
      invalidatesTags: ["user-me"],
    }),
  }),
});

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} = authApi;
