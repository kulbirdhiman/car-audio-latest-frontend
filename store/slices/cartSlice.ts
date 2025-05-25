"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartCount: number;
}

const initialState: CartState = {
  cartCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
  },
});

export const { loadCart } = cartSlice.actions;
export default cartSlice.reducer;
