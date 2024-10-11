import { createSlice } from '@reduxjs/toolkit';


const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState: [],
  reducers: {
    addIngredientToBurger: (state, action) => [...state, action.payload],
    dropIngredientFromBurger: (state, action) => [...state.filter(ingredient => ingredient.id !== action.payload)],
  },

});

export const { addIngredientToBurger, dropIngredientFromBurger } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;