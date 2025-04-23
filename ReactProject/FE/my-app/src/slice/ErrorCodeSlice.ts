// ErrorCodeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ErrorCode {
  code: string;
  message: string;
  locale: string;
}

interface ErrorCodeState {
  errorCodes: ErrorCode[];
  input: ErrorCode;
}

const initialState: ErrorCodeState = {
  errorCodes: [],
  input: { code: '', message: '', locale: '' },
};

export const fetchErrorCodes = createAsyncThunk(
  'errorCode/fetchAll',
  async () => {
    const res = await axios.get<ErrorCode[]>('/error-codes');
    return res.data;
  }
);

export const addErrorCode = createAsyncThunk(
  'errorCode/add',
  async (newCode: ErrorCode) => {
    await axios.post('/error-codes', newCode);
    return newCode;
  }
);

export const updateErrorCode = createAsyncThunk(
  'errorCode/update',
  async (code: ErrorCode) => {
    await axios.put(`/error-codes/${code.code}`, code);
    return code;
  }
);

export const ErrorCodeSlice = createSlice({
  name: 'errorCode',
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.input.code = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.input.message = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.input.locale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchErrorCodes.fulfilled, (state, action) => {
      state.errorCodes = action.payload;
    });
    builder.addCase(addErrorCode.fulfilled, (state, action) => {
      state.errorCodes.push(action.payload);
    });
    builder.addCase(updateErrorCode.fulfilled, (state, action) => {
      const index = state.errorCodes.findIndex(
        (e) => e.code === action.payload.code && e.locale === action.payload.locale
      );
      if (index > -1) state.errorCodes[index] = action.payload;
    });
  },
});

export const { setCode, setMessage, setLocale } = ErrorCodeSlice.actions;
export default ErrorCodeSlice.reducer;
