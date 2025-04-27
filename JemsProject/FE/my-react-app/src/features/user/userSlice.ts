import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../../api/userApi';
import { User } from './userTypes';
import { fetchApi } from '../../api/apiEndPoint';

interface UserState {
  data: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  data: null,
  status: 'idle',
};

export const getUser = createAsyncThunk('user/fetchUser', async () => {
  //const data = await fetchUser();
  const data = await fetchApi("home");
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
