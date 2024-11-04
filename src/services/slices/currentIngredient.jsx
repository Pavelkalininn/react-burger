import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: cookies.get('currentIngredient') || null,
  reducers: {
    chooseIngredient: (state, action) => {
      cookies.set('currentIngredient', action.payload);
      return action.payload;
    },
    dropIngredient: (state, action) => {
      cookies.remove('currentIngredient');
      return null;
    },
  },
});

export const { chooseIngredient, dropIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
