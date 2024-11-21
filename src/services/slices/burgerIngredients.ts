import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';
import { IngredientType } from '../../types/burger';

type TInitialState = {
  ingredients: IngredientType[],
  bun: IngredientType | null,
}

const InitialState: TInitialState = {
  ingredients: [],
  bun: null,

}

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: InitialState,
  reducers: {
    addIngredientToBurger: {
      reducer: (state, action: PayloadAction<{ingredient: IngredientType}>) => {
        return { bun: state.bun, ingredients: [...state.ingredients, action.payload.ingredient] };
      },
      prepare: (ingredient) => {
        return { payload: { ingredient: { ...ingredient.ingredient, uuid: uuid4() } } };
      },
    },
    dropIngredientFromBurger: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => ingredient.uuid !== action.payload),
      };
    },
    addBunToBurger: {
      reducer: (state, action: PayloadAction<{ingredient: IngredientType}>) => {
        return { ...state, bun: action.payload.ingredient };
      },
      prepare: (ingredient) => {
        return { payload: { ingredient: { ...ingredient.ingredient, uuid: uuid4() } } };
      },

    },
    moveIngredient: (state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) => {
      if (typeof action.payload.dragIndex !== 'undefined') {
        const ingredient  = state.ingredients.splice(action.payload.dragIndex, 1)[0];
        state.ingredients.splice(action.payload.hoverIndex , 0, ingredient);
      }
    },
    removeIngredients: () => {
      return {
        ingredients: [],
        bun: null
      };
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
