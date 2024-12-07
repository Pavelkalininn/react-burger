import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { TOrderCard } from '../../../types/order';
import { api_url } from '../../const';
import { checkResponse } from '../utils';


export const fetchCurrentOrder = createAsyncThunk('orders/fetchCurrentOrder', async ({ orderNumber }: {orderNumber: string}) => {
  return await fetch(`${api_url}/api/orders/${orderNumber}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((res) => checkResponse(res));
});

type TInitialState = {
  orderFeed: TOrderCard[],
  total: number,
  totalToday: number,
  currentOrder: TOrderCard | null,
  isEstablishingConnection: boolean,
  isConnected: boolean,
  error: string,
}
export const initialState: TInitialState = {
  orderFeed: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
  isEstablishingConnection: false,
  isConnected: false,
  error: ''
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    removeOrdersState: () => {
      return initialState
    },
    startConnection: ((state, action) => {
      state.isEstablishingConnection = true;
    }),
    connectionEstablished: (state => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    }),
    connectionError: ((state, action) => {
      state.error = action.payload;
      state.isConnected = false;
      state.isEstablishingConnection = false;
    }),
    getMessage: ((state, action) => {
      const data = JSON.parse(action.payload);
      state.orderFeed = data.orders;
      state.total = data.total;
      state.totalToday = data.totalToday;
    }),
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    dropCurrentOrder: (state) => {
      state.currentOrder = null
    },
    closeConnection: (state => initialState),
    sendOrder: ((state, action) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
    })
  }
});
export const {
  removeOrdersState,
  startConnection,
  connectionEstablished,
  connectionError,
  getMessage,
  closeConnection,
  setCurrentOrder,
  dropCurrentOrder,
  sendOrder } = ordersSlice.actions;
export const orderActions = ordersSlice.actions;
export default ordersSlice.reducer;
