"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import setAuthToken from "@/store/setAuthToken";
import { AuthResponse, FormData, listResponse } from "@/helpers/interfaces";

const authToken = Cookies.get("loggedIn") || "";
setAuthToken(authToken);

export const GetStats = createAsyncThunk<listResponse, FormData>(
  "stats",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
        params: data,
      };

      const res = await axios.get<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/admin_dashboard/stats`,
        config
      );
      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      dispatch(registerError(error.response?.data));

      return rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "An error occurred",
          errors: [],
        }
      );
    }
  }
);
export const GetSalesChart = createAsyncThunk<listResponse, FormData>(
  "Chart",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
        params: data,
      };

      const res = await axios.get<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/admin_dashboard/sale_data`,
        config
      );
      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      dispatch(registerError(error.response?.data));

      return rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "An error occurred",
          errors: [],
        }
      );
    }
  }
);