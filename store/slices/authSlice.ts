"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { log } from "console";
import { toast } from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: number; 
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  registerSuccess: {
    success: boolean;
    message: string;
  };
  globalErrorAlert: {
    success: boolean;
    message: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  registerSuccess: { success: false, message: "" },
  globalErrorAlert: { success: false, message: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loadUserError: (state, action: PayloadAction<{ message: string }>) => {
      // toast.error(action.payload.message);
      state.loading = false;
      state.isAuthenticated = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ success: boolean; message: string }>
    ) => {
      toast.success(action.payload.message);
      state.registerSuccess = action.payload;
      state.globalErrorAlert = { success: false, message: "" };
    },
    registerError: (
      state,
      action: PayloadAction<{ success: boolean; message: string }>
    ) => {
      console.log("lll",action);
      
      toast.error(action.payload.message);
      state.globalErrorAlert = action.payload;
      state.registerSuccess = { success: false, message: "" };
    },
  },
});

export const {
  loadUser,
  registerSuccess,
  registerError,
  logoutSuccess,
  loadUserError,
} = authSlice.actions;
export default authSlice.reducer;
