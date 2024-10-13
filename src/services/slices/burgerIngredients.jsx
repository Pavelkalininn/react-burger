import { createSlice } from '@reduxjs/toolkit';

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: [],
  reducers: {
    addIngredientToBurger: (state, action) => {
      let newState = state;
      newState.splice(action.payload.id, 0, action.payload.ingredient);
      return newState;
    },
    dropIngredientFromBurger: (state, action) => {
      state.splice(action.payload, 1);
      return state;
    },
    addBunToBurger: (state, action) => {
      if (state.filter((ingredient) => ingredient.type === 'bun').length > 1) {
        state[0] = action.payload.ingredient;
        state[state.length - 1] = action.payload.ingredient;
      } else {
        state.splice(state.length, 0, action.payload.ingredient);
        state.splice(0, 0, action.payload.ingredient);
      }
      return state;
    },
    moveIngredient: (state, action) => {
      if (action.payload.dragIndex) {
        const ingredient = state[action.payload.dragIndex];
        state.splice(action.payload.dragIndex, 1);
        state.splice(action.payload.hoverIndex, 0, ingredient);
      }
    },
  },
});

export const { addIngredientToBurger, dropIngredientFromBurger, addBunToBurger, moveIngredient } =
  burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
