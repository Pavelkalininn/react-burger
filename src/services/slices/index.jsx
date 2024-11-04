import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSliceReducer from './ingredients';
import burgerIngredientsSliceReducer from './burgerIngredients';
import currentIngredientSliceReducer from './currentIngredient';
import orderNumberSliceReducer from './order';
import authorizationReducer from './authorization';

export const rootReducer = combineSlices({
  ingredientsSlice: ingredientsSliceReducer,
  burgerIngredientsSlice: burgerIngredientsSliceReducer,
  currentIngredientSlice: currentIngredientSliceReducer,
  orderNumberSlice: orderNumberSliceReducer,
  authorization: authorizationReducer,
});
