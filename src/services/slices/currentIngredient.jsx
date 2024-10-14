import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: null,
  reducers: {
    chooseIngredient: (state, action) => action.payload,
    dropIngredient: (state, action) => null,
  },
});

export const { chooseIngredient, dropIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
