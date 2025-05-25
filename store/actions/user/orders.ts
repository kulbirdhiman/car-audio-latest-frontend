import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";


export const getMyOrders = createAsyncThunk<listResponse, FormData>(
    "getMyOrder/list",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        // Convert FormData to an object for easy query param handling
        const queryParams = new URLSearchParams(data as any).toString();
  
        const res = await api.get<listResponse>(
          `/v1/order/my_orders?${queryParams}`
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
  
