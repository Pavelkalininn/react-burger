import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { api_url } from '../const';
import { checkResponse } from './utils';

export const fetchOrder = createAsyncThunk<{order: {number: number}, success: boolean}, string[]>('order/fetchOrder', async (ingredients) => {
  return await fetch(`${api_url}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  }).then((res) => checkResponse(res));
});

type TInitialState = {
  number: number | null,
  isLoading: boolean,
  isFetched: boolean,
  isSuccess: boolean,
  isError: boolean,
  error?: string,
}
const initialState: TInitialState = {
  number: null,
  isLoading: false,
  isFetched: false,
  isSuccess: false,
  isError: false,
  error: '',
}

const orderNumberSlice = createSlice({
  name: 'orderNumber',
  initialState: initialState,
  reducers: {
    removeOrder: () => {
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
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<{order: {number: number}, success: boolean}>) => {
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
