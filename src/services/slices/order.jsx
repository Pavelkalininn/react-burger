import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api_url } from '../const';
import { checkResponse } from './utils';

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (ingredients) => {
  return await fetch(`${api_url}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ingredients: ingredients }),
  }).then((res) => checkResponse(res));
});

const orderNumberSlice = createSlice({
  name: 'orderNumber',
  initialState: {
    number: null,
    isLoading: false,
    isFetched: false,
    isSuccess: false,
    isError: false,
    error: '',
  },
  reducers: {
    removeOrder: (state, action) => {
      return {
        number: null,
        isLoading: false,
        isFetched: false,
        isSuccess: false,
        isError: false,
        error: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.number = action.payload.order.number;
        state.isSuccess = action.payload.success;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { removeOrder } = orderNumberSlice.actions;
export default orderNumberSlice.reducer;
