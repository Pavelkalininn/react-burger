import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSliceReducer from './ingredients';
import burgerIngredientsSliceReducer from './burgerIngredients';
import currentIngredientSliceReducer from './currentIngredient';
import orderNumberSliceReducer from './order';
import passwordResetReducer from './passwordReset';
import passwordResetSubmitReducer from './passwordResetSubmit';
import authorizationReducer from './authorization';

export const rootReducer = combineSlices({
  ingredientsSlice: ingredientsSliceReducer,
  burgerIngredientsSlice: burgerIngredientsSliceReducer,
  currentIngredientSlice: currentIngredientSliceReducer,
  orderNumberSlice: orderNumberSliceReducer,
  passwordResetSlice: passwordResetReducer,
  passwordResetSubmitSlice: passwordResetSubmitReducer,
  authorization: authorizationReducer,

});
