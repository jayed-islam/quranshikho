import { ICourse } from "../../../types/course";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CourseState {
  courses: ICourse[] | null;
  isCourseLoading: boolean;
  singleCourse: ICourse | null;
}

const initialState: CourseState = {
  courses: null,
  isCourseLoading: false,
  singleCourse: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
    setCourseLoading: (state, action: PayloadAction<boolean>) => {
      state.isCourseLoading = action.payload;
    },
    setSingleCourse: (state, action: PayloadAction<ICourse>) => {
      state.singleCourse = action.payload;
    },
  },
});

export const { setCourses, setCourseLoading, setSingleCourse } =
  courseSlice.actions;
export default courseSlice.reducer;
