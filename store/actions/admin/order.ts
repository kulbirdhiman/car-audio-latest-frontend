import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";

 

export const getOrder = createAsyncThunk<listResponse, FormData>(
  "orders/list",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/order/list?${queryParams}`
      );
      console.log("rr",res);
      
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



export const getOrderDetail = createAsyncThunk<listResponse, FormData>(
  "orders/detail",
  async (data, { dispatch, rejectWithValue }) => {
    try {
    
      const res = await api.get<listResponse>(
        `/v1/order/detail/${data.id}`
      );
      console.log("rr",res);
      
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

 // ✅ update order
export const updateOrder = createAsyncThunk<listResponse, FormData>(
  "update/order",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put<listResponse>(`/v1/order/update/${data.id}`, data);
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


export const printlabel = createAsyncThunk<listResponse, FormData>(
  "print_label/order",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>(`/v1/order/print_label`, data);
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