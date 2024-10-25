
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api_url } from '../const';
import { checkResponse } from './utils';
import { useSelector } from 'react-redux';

export const fetchPasswordResetSubmit = createAsyncThunk('password/resetSubmit', async ({password, token}) => {
  return await fetch(`${api_url}/api/password-reset/reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password, token }),
  }).then((res) => checkResponse(res));
});


const passwordResetSubmitSlice = createSlice({
  name: 'passwordResetSubmit',
  initialState: {
    password: '',
    token: '',
    isLoading: false,
    isSuccess: false,
    isFetched: false,
    isError: false,
    error: ''
  },
  reducers: {
    setPassword: (state, action) => {
      return {
        password: action.payload,
        token: state.token,
      };
    },
    setToken: (state, action) => {
      return {
        password: state.password,
        token: action.payload
      };
    },
    removePasswordResetSubmitState: (state, action) => {
      return {
        password: '',
        token: '',
        isLoading: false,
        isSuccess: false,
        isFetched: false,
        isError: false,
        error: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPasswordResetSubmit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPasswordResetSubmit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
      })
      .addCase(fetchPasswordResetSubmit.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { removePasswordResetSubmitState, setToken, setPassword } = passwordResetSubmitSlice.actions;
export default passwordResetSubmitSlice.reducer;