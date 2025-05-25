import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";

// ✅ Add Product
export const addProduct = createAsyncThunk<listResponse, FormData>(
  "product/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>("/v1/product/add", data);
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

export const getProduct = createAsyncThunk<listResponse, FormData>(
  "product/list",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/product/list?${queryParams}`
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

export const detailProduct = createAsyncThunk<listResponse, FormData>(
  "product/list/detail",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/product/list/${data.slug}?${queryParams}`
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

export const editProduct = createAsyncThunk<listResponse, FormData>(
  "product/edit",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>(
        `/v1/product/edit/${data.id}`,
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

export const deleteProduct = createAsyncThunk<listResponse, FormData>(
  "product/edit",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put<listResponse>(
        `/v1/product/delete/${data.id}`,
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



export const getProductForShop = createAsyncThunk<listResponse, FormData>(
  "product/list/shop",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/product/list/shop?${queryParams}`
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


export const ProductForShop = createAsyncThunk<listResponse, FormData>(
  "product/list/shop",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Convert FormData to an object for easy query param handling
      const queryParams = new URLSearchParams(data as any).toString();

      const res = await api.get<listResponse>(
        `/v1/product/list/shop/${data.slug}?${queryParams}`
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


export const deleteFilesApi = createAsyncThunk<listResponse, FormData>(
  "files/delete",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post<listResponse>("/v1/upload/delete", data);
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