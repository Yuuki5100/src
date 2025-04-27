import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../api/authApi';
import { showError, showSuccess } from '../../lib/toast';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const tokenFromStorage = localStorage.getItem('token');
const expiresAt = localStorage.getItem('expiresAt');
const isExpired = expiresAt ? parseInt(expiresAt) < new Date().getTime() : true;

const initialState: AuthState = {
  isAuthenticated: !!tokenFromStorage && !isExpired,
  token: !isExpired ? tokenFromStorage : null,
  user: null,
  status: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginApi(credentials.username, credentials.password);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
      })
      // ログイン成功時
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user, expiresIn = 3600 } = action.payload;

        const expiresAt = new Date().getTime() + expiresIn * 1000;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());

        state.token = accessToken;
        state.user = user;
        state.isAuthenticated = true;
        state.status = 'succeeded';

        showSuccess('ログインに成功しました');
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.token = null;
        showError(action.payload as string);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
