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
export const getCategories = createAsyncThunk<listResponse, Record<string, any> | void>(
  "category_list",
  async (queryParams = {},  { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
        params: queryParams,
      };

      const res = await axios.get<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/category/list`,
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
export const addCategory = createAsyncThunk<listResponse, FormData>(
  "category/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.post<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/category/add`,
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
export const editCategory = createAsyncThunk<listResponse, FormData>(
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
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/category/edit/${
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

// delete department
export const deleteCategory = createAsyncThunk<listResponse, FormData>(
  "delete_cat",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.put<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/category/delete/${
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

// Sign In Action
export const detailCategory = createAsyncThunk<listResponse, FormData>(
  "category/list",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        
        },
        params: data,
      };

      let query = `${process.env.NEXT_PUBLIC_ADDRESS}/v1/category/detail/${
        (data as any)?.slug}`;

      

      const res = await axios.get<listResponse>(query, config);

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
