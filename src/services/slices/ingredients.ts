import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api_url } from '../const';
import { checkResponse } from './utils';
import { IngredientType } from '../../types/burger';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  return await fetch(`${api_url}/api/ingredients`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => checkResponse(res));
});

type TInitialState = {
  ingredients: IngredientType[],
  isLoading: boolean,
  isFetched: boolean,
  isError: boolean,
  error: string,
}

const initialState: TInitialState = {
  ingredients: [],
  isLoading: false,
  isFetched: false,
  isError: false,
  error: '',
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.ingredients = action.payload.data;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message || '';
      });
  },
});

export default ingredientsSlice.reducer;
