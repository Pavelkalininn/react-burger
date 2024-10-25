
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api_url } from '../const';
import { checkResponse } from './utils';

export const fetchPasswordReset = createAsyncThunk('password/reset', async (email) => {
  return await fetch(`${api_url}/api/password-reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: email }),
  }).then((res) => checkResponse(res));
});


const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: {
    email: '',
    isLoading: false,
    isSuccess: false,
    isFetched: false,
    isError: false,
    error: ''
  },
  reducers: {
    setEmail: (state, action) => {
      return {
        email: action.payload
      };
    },
    removeState: (state, action) => {
      return {
        email: '',
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
      .addCase(fetchPasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
      })
      .addCase(fetchPasswordReset.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { removeState, setEmail } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;