import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";

// ✅ Add Product
export const addVariation = createAsyncThunk<listResponse, FormData>(
  "variation/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>("/v1/variation/add", data);
      if (res.data.success) {
        dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      dispatch(registerError(error));
      return rejectWithValue(error);
    }
  }
);

export const getVariations = createAsyncThunk<listResponse, FormData>(
  "variation/list",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/variation/list?${queryParams}`
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
 
 

export const editVariation = createAsyncThunk<listResponse, FormData>(
  "add_on/edit",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put<listResponse>(
        `/v1/variation/edit/${data.id}`,
        data
      );

      if (res.data.success) {
        console.log(res);

        dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      console.log(error);

      dispatch(registerError(error));
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const deleteVariation = createAsyncThunk<listResponse, FormData>(
  "add_on/delete",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put<listResponse>(
        `/v1/variation/delete/${data.id}`,
        data
      );

      if (res.data.success) {
        dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      console.log(error);

      dispatch(registerError(error));
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const checkVariations = createAsyncThunk<listResponse, FormData>(
  "variation/check_variation",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>("/v1/variation/check_variation", data);
      if (res.data.success) {
        // dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      dispatch(registerError(error));
      return rejectWithValue(error);
    }
  }
);