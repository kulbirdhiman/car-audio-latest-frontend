import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";
import { registerError, registerSuccess } from "@/store/slices/authSlice";
import { FormData, listResponse } from "@/helpers/interfaces";
import { loadCart } from "../slices/cartSlice";
import { Images } from "lucide-react";
import Cookies from "js-cookie";
import { IS_MULTY_PRICE } from "@/app/constants";
import { Result } from "postcss";
import { AnyARecord } from "dns";
// ✅ Add Product
export const addToCart = createAsyncThunk<any, FormData>(
  "cart/add",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      if (!data.user_id) {
        const res = handleLogOutCart(data);

        if (res.success) {
          let addOnsQuantity: number = 0;
          if (data?.addOns?.length > 0) {
            addOnsQuantity = data.addOns.length;
          }

          dispatch(
            loadCart(
              parseInt(data.cartCount) +
                parseInt(data.quantity) +
                addOnsQuantity
            )
          );
          dispatch(registerSuccess(res));
          return res;
        } else {
          return rejectWithValue(res);
        }
      }

      const res = await api.post<listResponse>("/v1/cart/add", {
        ...data,
        product_id: data.id,
      });
      if (res.data.success) {
        let addOnsQuantity: number = 0;
        if (data?.addOns?.length > 0) {
          addOnsQuantity = data.addOns.length;
        }

        dispatch(
          loadCart(
            parseInt(data.cartCount) + parseInt(data.quantity) + addOnsQuantity
          )
        );
        dispatch(registerSuccess(res.data));
      }
      return res.data;
    } catch (error: any) {
      dispatch(registerError(error));
      return rejectWithValue(error);
    }
  }
);

export const handleLogOutCart = (addToData: Record<string, any>) => {
  let localData: Record<string, any>[] = [];

  const storedData = localStorage.getItem("addToCart");
  if (storedData) {
    try {
      // console.log(storedData, "storedData");
      console.log(addToData.variations);

      localData = JSON.parse(storedData) || [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      localData = [];
    }
  }

  addToData = { ...addToData, cart_id: Date.now() };
  localData.push({
    cart_id: Date.now(),
    images: addToData.images,
    quantity: addToData.quantity,
    name: addToData.name,
    slug: addToData.slug,
    weight: addToData.weight,
    variations: addToData.variations,
    product_id: addToData.id,
    regular_price: addToData.regular_price,
    discount_price: addToData.discount_price,
    price: addToData.discount_price
      ? addToData.discount_price
      : addToData.regular_price,
      department_id:addToData.department_id,
      category_id:addToData.category_id,
      model_id:addToData.model_id,
    //   +addToData.variations.reduce((sum, variation) => {
    //     return sum +  variation.options.reduce((optSum, option) => optSum + option.price, 0);
    // }, 0),
  });

  const totalQuantity = localData.reduce((c, sum) => c + sum.quantity, 0);
  if (totalQuantity > (addToCart as any).stock_quantity) {
    return { success: false, message: "Maximum quantity reached" };
  }
  if (addToData?.addOns?.length > 0) {
    const addOns = addToData?.addOns.map((r:any, i:any) => ({
      cart_id: Date.now(),
      images: r.images,
      quantity: r.quantity,
      name: r.name,
      slug: r.slug,
      weight: r.weight,
      regular_price: r.regular_price,
      discount_price: r.discount_price,
      variations: r.variations,
      product_id: r.id,
      price: r.discount_price ? r.discount_price : r.regular_price,
      department_id:r.department_id,
      category_id:r.category_id,
      model_id:r.model_id,
      //   +r.variations.reduce((sum, variation) => {
      //     return sum + variation.options.reduce((optSum, option) => optSum + option.price, 0);
      // }, 0),
    }));

    localData.push(...addOns);
  }

  localStorage.setItem("addToCart", JSON.stringify(localData));
  return { success: true, message: "Added to cart successfully" };
};

export const cartCountAction = createAsyncThunk(
  "cart_count",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // "x-auth-token": `${Cookies.get("loggedIn")}`,
        },
      };

      if (!Cookies.get("loggedIn")) {
        let cartQuantity = localCart();

        dispatch(loadCart(cartQuantity));

        return;
      }

      const res = await api.get<listResponse>("/v1/cart/cart_count");

    
      dispatch(loadCart(res.data.data.count));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const localCart = () => {
  let QuantityDataConst = 0;
  let localData = localStorage.getItem("addToCart");

  localData = localData ? JSON.parse(localData) : [];

  let totalQuantity = 0;
  if (localData && localData?.length) {
    totalQuantity = (localData as any).reduce(
      (total:any, product:any) => total + product.quantity,
      0
    );
  }
  return totalQuantity;
};

export const localCartData = () => {
  let localData = localStorage.getItem("addToCart");

  localData = localData ? JSON.parse(localData) : [];

  const total = (localData as any)?.reduce(
    (total:any, product:any) =>
      total +
      (product.discount_price > 0
        ? product.discount_price
        : product.regular_price) *
        product.quantity,
    0
  );

  return {
    result: (localData as any)?.length > 0 ? localData : [],
    total: total,
  };
};

export const deleteCart = createAsyncThunk<any, any>(
  "cart/deleteCart",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loadCart(data.cartCount - data.quantity));
      if (!data.user_id) {
        console.log("data", data);

        const res = logOutDelete(data);
        dispatch(registerSuccess(res));
        return res;
      }

      const res = await api.delete<listResponse>(`/v1/cart/delete/${data.id}`, data);
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

const logOutDelete = (data:any) => {
  let localData = localStorage.getItem("addToCart");

  localData = localData ? JSON.parse(localData) : [];

  localData = (localData as any).filter((cart: any) => {
    const removeItem =
      cart.cart_id === data.cart_id && cart.product_id === data.product_id;

    return !removeItem;
  });

  localStorage.setItem("addToCart", JSON.stringify(localData));

  return { success: true, message: "Product deleted from  successfully" };
};

export const calculatePrice = (row:any) => {
  let price = row.discount_price ? row.discount_price : row.regular_price;
  if(row.is_free == 1){
    price = 0
  }

  const variationPrice = row.variations.reduce((sum:any, variation:any) => {
    return (
      sum +
      (variation.is_quantity_based == IS_MULTY_PRICE ? row.quantity : 1) *
        variation.options.reduce((optSum :any, option:any) => optSum + option.price, 0)
    );
  }, 0);

  return variationPrice + price * row.quantity;
};

export const calculateRegularPrice = (row:any) => {
  const price = row.regular_price;

  const variationPrice = row.variations.reduce((sum:any, variation:any) => {
    return (
      sum +
      (variation.is_quantity_based == IS_MULTY_PRICE ? row.quantity : 1) *
        variation.options.reduce((optSum:any, option:any) => optSum + option.price, 0)
    );
  }, 0);

  return variationPrice + price * row.quantity;
};

export const calculateSubTotal = (data:any) => {
  const subTotal = data.reduce((sum:any, row:any) => sum + calculatePrice(row), 0);
  return subTotal;
};

export const myCart = createAsyncThunk<any, FormData>(
  "myCart",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get<listResponse>(`/v1/cart/list`);
      console.log(res.data.data);
      const result = (res.data.data as any).result.map((item:any) => ({
        ...item,
        ...item.product,
        id:item.id,
        product_id:item.product.id
      }));

      console.log(result);

      return { result: result };
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
