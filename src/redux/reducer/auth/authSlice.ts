import { setSession } from "@/src/auth/utils";
import { IUserItem } from "@/src/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: IUserItem | null;
  authenticated: boolean;
  authLoading: boolean;
  accessToken?: string;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  authLoading: false,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      setSession(action.payload);
      // state.accessToken == action.payload;
      state.accessToken = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserItem | null>) => {
      state.user = action.payload;
      state.authLoading = false;
      state.authenticated = true;
    },
    logOut: (state) => {
      state.authenticated = false;
      state.authLoading = false;
      state.accessToken = "";
      state.user = null;
      setSession(null);
      localStorage.clear();
    },
  },
});

export const { setToken, setAuthLoading, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
