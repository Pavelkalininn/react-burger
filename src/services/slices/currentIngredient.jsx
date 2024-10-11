import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    currentIngredient: null,
  },
  reducers: {
    chooseIngredient: (state, action) => action.payload,
    dropIngredient: (state) => null,
  },
});

export const { chooseIngredient, dropIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;