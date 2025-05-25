import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";
import { loadCart } from "../slices/cartSlice";
import { Images } from "lucide-react";
import Cookies from "js-cookie";

export const getShipping = createAsyncThunk<listResponse, FormData>(
    "shipping/price",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.post<listResponse>("/v1/checkout/shipping_price", data);
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

  export const applyCoupon = createAsyncThunk<listResponse, FormData>(
    "applyCoupon/price",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const res = await api.post<listResponse>("/v1/checkout/add_coupon", data);
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