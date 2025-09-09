import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";

// ✅ Add Product
export const addRedirectUrl = createAsyncThunk<listResponse, FormData>(
  "redirect_url/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>("/v1/redirect_url/add", data);
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
 
export const getRedirectUrl = createAsyncThunk<listResponse, FormData>(
    "redirect_url/list",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        // Convert FormData to an object for easy query param handling
        const queryParams = new URLSearchParams(data as any).toString();
  
        const res = await api.get<listResponse>(
          `/v1/redirect_url/list?${queryParams}`
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
         

  export const editRedirectUrl = createAsyncThunk<listResponse, FormData>(
    "redirect_url/edit",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.put<listResponse>(
          `/v1/redirect_url/edit/${data.id}`,
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
  

  export const deleteRedirectUrl = createAsyncThunk<listResponse, FormData>(
    "redirect_url/edit",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.put<listResponse>(
          `/v1/redirect_url/delete/${data.id}`,
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
  