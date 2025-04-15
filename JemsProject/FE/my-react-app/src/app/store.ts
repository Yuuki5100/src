import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer, // ←追加
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;