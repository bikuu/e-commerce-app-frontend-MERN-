import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    allProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { allProducts } = productSlice.actions;

export default productSlice.reducer;
