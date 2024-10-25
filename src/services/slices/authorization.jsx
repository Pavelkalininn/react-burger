
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api_url } from '../const';
import { checkResponse } from './utils';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export const fetchRegister = createAsyncThunk('register', async ({ email, password, name }) => {
  return await fetch(`${api_url}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));
});


export const fetchLogin = createAsyncThunk('login', async ({ email, password }) => {
  return await fetch(`${api_url}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
});


export const fetchToken = createAsyncThunk('token', async () => {
  const token = cookies.get('refreshToken');
  return await fetch(`${api_url}/api/auth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token }),
  }).then((res) => checkResponse(res));
});


export const fetchLogout = createAsyncThunk('logout', async () => {
  const token = cookies.get('refreshToken');
  return await fetch(`${api_url}/api/auth/logout`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token }),
  }).then((res) => checkResponse(res));
});

const initialState = {
  email: '',
  password: '',
  name: '',
  accessToken: '',
  isAuthorized: false,
  isLoading: false,
  isSuccess: false,
  isFetched: false,
  isError: false,
  error: ''
}


const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    removeState: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
        if (action.payload.success) {
          state.accessToken = action.payload.accessToken;
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          cookies.set('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      })

      .addCase(fetchLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
        if (action.payload.success) {
          state.accessToken = action.payload.accessToken;
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          cookies.set('refreshToken', action.payload.refreshToken)
        }
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(fetchToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        if (action.payload.success) {
          cookies.remove('refreshToken');
          return initialState
        }
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { removeState, setValue } = authorizationSlice.actions;
export default authorizationSlice.reducer;