"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import setAuthToken from "@/store/setAuthToken";
import { AuthResponse, FormData, listResponse } from "@/helpers/interfaces";

// Ensure Cookies token is correctly set
const authToken = Cookies.get("loggedIn") || "";
setAuthToken(authToken);

// Sign In Action
export const getDepartment = createAsyncThunk<listResponse, FormData>(
  "get_department",
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
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/department/list`,
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
export const getcarDepartment = createAsyncThunk<listResponse, FormData>(
  "get_department",
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
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/department/car-products`,
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
// Add department
export const addDepartment = createAsyncThunk<listResponse, FormData>(
  "signIn",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.post<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/department/add`,
        data,
        config
      );

      if (res.data.success) {
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

// edit department
export const editDepartment = createAsyncThunk<listResponse, FormData>(
  "edit_dept",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.put<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/department/edit/${
          (data as any).id
        }`,
        data,
        config
      );

      if (res.data.success) {
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

// edit department
export const deleteDepartment = createAsyncThunk<listResponse, FormData>(
  "delete_dept",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.put<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/department/delete/${
          (data as any).id
        }`,
        data,
        config
      );

      if (res.data.success) {
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


export const updateOrderOfDept = createAsyncThunk<listResponse, FormData>(
  "edit_dept",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.put<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/department/update_order`,
        data,
        config
      );

      if (res.data.success) {
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