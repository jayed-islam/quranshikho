import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "./reducer/auth/authSlice";
import courseSlice from "./reducer/course/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    course: courseSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
