import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { IngredientType } from '../../types/burger';

export const cookies = new Cookies();

export const initialState: IngredientType | null = cookies.get('currentIngredient') || null;

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialState,
  reducers: {
    chooseIngredient: (state, action: PayloadAction<IngredientType>) => {
      cookies.set('currentIngredient', action.payload);
      return action.payload;
    },
    dropIngredient: () => {
      cookies.remove('currentIngredient');
      return null;
    },
  },
});

export const { chooseIngredient, dropIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
