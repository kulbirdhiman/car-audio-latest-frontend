"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import setAuthToken from "@/store/setAuthToken";
import { AuthResponse, FormData, listResponse } from "@/helpers/interfaces";
import api from "@/store/axiosInstance";

// Ensure Cookies token is correctly set
const authToken = Cookies.get("loggedIn") || "";
setAuthToken(authToken);
 
// Add  
export const addCarModel = createAsyncThunk<listResponse, FormData>(
  "car_model/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.post<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/car_model/add`,
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


// edit
export const editCarModel = createAsyncThunk<listResponse, FormData>(
    "editCarModel",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
          },
        };
  
        const res = await axios.put<listResponse>(
          `${process.env.NEXT_PUBLIC_ADDRESS}/v1/car_model/edit/${
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
  


  // delete  
export const deleteCarModel = createAsyncThunk<listResponse, FormData>(
  "deleteCarModel",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("loggedIn") || ""}`,
        },
      };

      const res = await axios.put<listResponse>(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/car_model/delete/${
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


// detail


export const detailCarModel = createAsyncThunk<listResponse, FormData>(
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

      let query = `${process.env.NEXT_PUBLIC_ADDRESS}/v1/car_model/detail/${
        (data as any)?.id}`;

      

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


export const getCarModels = createAsyncThunk<listResponse, FormData>(
  "car_model/list",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/car_model/list?${queryParams}`
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
