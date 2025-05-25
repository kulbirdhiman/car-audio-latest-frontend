import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";

// ✅ Add Product
export const addAddress = createAsyncThunk<listResponse, FormData>(
  "address/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>("/v1/address/add", data);
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


// ✅ Add Product
export const editAddress = createAsyncThunk<listResponse, FormData>(
  "address/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>(`/v1/address/edit/${data.id}`, data);
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
 

export const getAddress = createAsyncThunk<listResponse, FormData>(
    "address/list",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        // Convert FormData to an object for easy query param handling
        const queryParams = new URLSearchParams(data as any).toString();
  
        const res = await api.get<listResponse>(
          `/v1/address/list?${queryParams}`
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

  export const deleteAddress = createAsyncThunk<listResponse, FormData>(
    "deleteAddress/add",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.put<listResponse>(`/v1/address/delete/${data.id}`, data);
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
 
 