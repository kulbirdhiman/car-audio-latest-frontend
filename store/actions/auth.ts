"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {
  loadUser,
  loadUserError,
  logoutSuccess,
  registerError,
  registerSuccess,
  User,
} from "@/store/slices/authSlice";
import setAuthToken from "../setAuthToken";
import { log } from "console";
import { AuthResponse, listResponse } from "@/helpers/interfaces";
import { FormData } from "@/helpers/interfaces";
import api from "../axiosInstance";
// Define Types

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  country: {
    id: string;
    name: string;
  };
  email: string;
  password: string;
  confirmPassword: string;
}

// Ensure Cookies token is correctly set
const authToken = Cookies.get("loggedIn") || "";
setAuthToken(authToken);

// Sign In Action
export const signIn = createAsyncThunk<AuthResponse, SignInData>(
  "signIn",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/auth/sign_in`,
        data,
        config
      );

      if (res.data.success) {
        Cookies.set("loggedIn", res.data?.data?.token!);
        console.log("hh", res.data);

        dispatch(loadUser(res.data.data?.user!));
        dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      console.log("error", error);
      dispatch(registerError(error.response?.data));

      console.error(error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data && Object.keys(error.response.data).length > 0
          ? error.response.data
          : { success: false, message: "An error occurred", errors: [] }
      );
    }
  }
);

// Sign Up Action
export const signUpAction = createAsyncThunk<AuthResponse, SignUpData>(
  "signUp",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const res = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/auth/sign_up`,
        data,
        config
      );

      if (res.data.success) {
        console.log(res.data);
        
        Cookies.set("loggedIn", (res.data as any).data.token!);
        // console.log("res.data.result",res.data.data.user);
        
        dispatch(loadUser(res.data.data?.user!));
        dispatch(registerSuccess(res.data));
      } else {
        dispatch(registerError(res.data));
      }

      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      console.log(error);
      dispatch(registerError(error.response?.data ));
      return rejectWithValue(
        error.response?.data || { success: false, message: "An error occurred" }
      );
    }
  }
);

// Load User Profile
export const myProfile = createAsyncThunk<AuthResponse>(
  "user/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.get<AuthResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/auth/my_profile`,
        config
      );

      if (res.data.success) {
        dispatch(loadUser(res.data.data?.user!));
      }

      console.log(res.data.data?.user);
      return res.data;
    } catch (error: any) {
      console.error(error);
      dispatch(loadUserError(error.response?.data));
      return rejectWithValue(
        error.response?.data || { success: false, message: "An error occurred" }
      );
    }
  }
);

// Logout Action
export const logoutUser = createAsyncThunk<{
  status: boolean;
  message: string;
}>("logoutUser", async (_, { dispatch }) => {
  try {
    Cookies.remove("loggedIn");

    const token = Cookies.get("loggedIn");
    if (token) {
      return { status: false, message: "Some Error Occurred! Try Again" };
    }

    dispatch(logoutSuccess());
    return { status: true, message: "Logged Out Successfully!" };
  } catch (error: any) {
    console.error(error);
    return { status: false, message: "An error occurred" };
  }
});

// Sign Up Action
 
export const sendOtp  = createAsyncThunk<listResponse, FormData>(
  "verify_otp/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>(`/v1/auth/send_otp/`, data);
      if (res.data.success) {
        // dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      console.log("gg",error);
      
      dispatch(registerError(error));
      return rejectWithValue(error);
    }
  }
);

 export const verifyOtp  = createAsyncThunk<listResponse, FormData>(
    "verify_otp/add",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.post<listResponse>(`/v1/auth/verify_otp/`, data);
        if (res.data.success) {
          dispatch(registerSuccess(res.data));
        }
        return res.data;
      } catch (error: any) {
        console.log("gg",error);
        
        dispatch(registerError(error));
        return rejectWithValue(error);
      }
    }
  );


  export const setPassword  = createAsyncThunk<listResponse, FormData>(
    "setPassword/add",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.post<listResponse>(`/v1/auth/set_password/`, data);
        console.log(res);
        
        if (res.data.success) {

          console.log("res.data)");
          Cookies.set("loggedIn", (res.data as any).data.token!);
          dispatch(loadUser(res.data.data?.user!));
          dispatch(registerSuccess(res.data));
          // dispatch(registerSuccess(res.data));
        }
        return res.data;
      } catch (error: any) {
 
        
        dispatch(registerError(error));
        return rejectWithValue(error);
      }
    }
  );

export const vverifyOtp = createAsyncThunk<AuthResponse, any>(
  "verify_otp",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const res = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/auth/verify_otp`,
        data,
        config
      );

      if (res.data.success) {
        console.log(res.data);
       
      } else {
        dispatch(registerError(res.data));
      }

      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      dispatch(registerError(error));
      return rejectWithValue(
        error.response?.data || { success: false, message: "An error occurred" }
      );
    }
  }
);

