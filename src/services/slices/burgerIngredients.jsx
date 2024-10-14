import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: {
    ingredients: [],
    bun: null,
  },
  reducers: {
    addIngredientToBurger: {
      reducer: (state, action) => {
        return { bun: state.bun, ingredients: [...state.ingredients, action.payload.ingredient] };
      },
      prepare: (ingredient) => {
        return { payload: { ingredient: { ...ingredient.ingredient, uuid: uuid4() } } };
      },
    },
    dropIngredientFromBurger: (state, action) => {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => ingredient.uuid !== action.payload),
      };
    },

    addBunToBurger: {
      reducer: (state, action) => {
        return { ...state, bun: action.payload.ingredient };
      },
    },
    moveIngredient: (state, action) => {
      if (action.payload.dragIndex) {
        const ingredient  = state.ingredients.splice(action.payload.dragIndex, 1)[0];
        state.ingredients.splice(action.payload.hoverIndex, 0, ingredient);
      }
    },
    removeIngredients: (state) => {
      return { ingredients: [], bun: null };
    },
  },
});

export const {
  removeIngredients,
  addIngredientToBurger,
  dropIngredientFromBurger,
  addBunToBurger,
  moveIngredient,
} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
