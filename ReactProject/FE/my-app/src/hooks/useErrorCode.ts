// useErrorCode.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/store';
import {
  fetchErrorCodes,
  addErrorCode as addThunk,
  updateErrorCode as updateThunk,
  setCode,
  setMessage,
  setLocale,
} from './ErrorCodeSlice';

export const useErrorCode = () => {
  const dispatch: AppDispatch = useDispatch();
  const { errorCodes, input } = useSelector((state: RootState) => state.errorCode);

  useEffect(() => {
    dispatch(fetchErrorCodes());
  }, [dispatch]);

  const addErrorCode = () => {
    if (!input.code || !input.locale || !input.message) {
      alert('全ての項目を入力してください');
      return;
    }
    dispatch(addThunk(input));
  };

  const updateErrorCode = (data: { code: string; message: string; locale: string }) => {
    dispatch(updateThunk(data));
  };

  return {
    code: input.code,
    message: input.message,
    locale: input.locale,
    setCode: (val: string) => dispatch(setCode(val)),
    setMessage: (val: string) => dispatch(setMessage(val)),
    setLocale: (val: string) => dispatch(setLocale(val)),
    addErrorCode,
    updateErrorCode,
    errorCodes,
  };
};
