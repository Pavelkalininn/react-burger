
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { api_url } from '../../const';
import { checkResponse } from '../utils';
import Cookies from 'universal-cookie';


export const cookies = new Cookies();

export const fetchRegister = createAsyncThunk('register', async ({ email, password, name }: {password: string, email: string, name: string}) => {
  return await fetch(`${api_url}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));
});


export const fetchLogin = createAsyncThunk('login', async ({ email, password }: {password: string, email: string}) => {
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


export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const token = cookies.get('accessToken');
  return await fetch(`${api_url}/api/auth/user`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    },
  }).then((res) => checkResponse(res));
});

export const updateUser = createAsyncThunk('updateUser', async ({ email, name, password }: {password: string, email: string, name: string}) => {
  const token = cookies.get('accessToken');
  return await fetch(`${api_url}/api/auth/user`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({ email, name, password }),
  }).then((res) => checkResponse(res));
});



export const fetchPasswordResetSubmit = createAsyncThunk('password/resetSubmit', async ({password, token}: {password: string, token: string}) => {
  return await fetch(`${api_url}/api/password-reset/reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password, token }),
  }).then((res) => checkResponse(res));
});

export const fetchPasswordReset = createAsyncThunk('password/reset', async ({email}: {email: string}) => {
  return await fetch(`${api_url}/api/password-reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  }).then((res) => checkResponse(res));
});


export type TAuthorizationInitialState = {
  email: string,
  password: string,
  name: string,
  user: string,
  token: string,
  isAuthChecked: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  isFetched: boolean,
  isError: boolean,
  error: string | undefined
}



export const authorizationInitialState: TAuthorizationInitialState = {
  email: '',
  password: '',
  name: '',
  user: '',
  token: '',
  isAuthChecked: false,
  isLoading: false,
  isSuccess: false,
  isFetched: false,
  isError: false,
  error: ''
}

type IChangeAction<K extends keyof TAuthorizationInitialState> = {
  key: K;
  value: TAuthorizationInitialState[K];
};


const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: authorizationInitialState,
  reducers: {
    setValue: <K extends keyof TAuthorizationInitialState>(state: TAuthorizationInitialState, action: PayloadAction<IChangeAction<K>>) => {
      state[action.payload.key] = action.payload.value;
    },
    removeState: () => {
      return {...authorizationInitialState, isAuthChecked: true};
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
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
          state.isAuthChecked = true;
          cookies.set('refreshToken', action.payload.refreshToken)
          cookies.set('accessToken', action.payload.accessToken)
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
          state.user = action.payload.user;
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.isAuthChecked = true;
          cookies.set('refreshToken', action.payload.refreshToken)
          cookies.set('accessToken', action.payload.accessToken)
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
        state.isAuthChecked = true;
        cookies.set('refreshToken', action.payload.refreshToken)
        cookies.set('accessToken', action.payload.accessToken)
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
          cookies.remove('accessToken');
        }
        state.isLoading = false;
        state.isFetched = true;
        state.isAuthChecked = true;
        state.isSuccess = action.payload.success;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      })

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      })


      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.isSuccess = action.payload.success;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error.message;
      })

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
      })

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

export const { setIsAuthChecked, removeState, setValue } = authorizationSlice.actions;
export default authorizationSlice.reducer;