

import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './store';
import {
  connectionEstablished,
  connectionError,
  getMessage,
  closeConnection,
} from '../services/slices/orders';
import { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: PayloadAction) => {
      const { dispatch } = store;
      const { type } = action;
      const payload = action.payload

      if (type === "orders/startConnection") {
        socket = new WebSocket(`${payload}?token=${cookies.get('accessToken')?.split(' ')[1]}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(connectionEstablished());
        };
        socket.onerror = event => {
          dispatch(connectionError(event));
        };
        socket.onmessage = event => {
          const { data } = event;
          dispatch(getMessage(data));
        };
        socket.onclose = event => {
          dispatch(closeConnection());
        };

        if (type === 'orders/sendOrder') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  }) as Middleware;
};