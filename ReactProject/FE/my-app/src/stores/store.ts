import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { sampleSlice } from '../reducer';


//Store生成
const store = configureStore({
    reducer: {
        // ここにReducerを登録する
        sample: sampleSlice.reducer,
    }
});

// TypeScriptの場合は下記をやらずに素のuseSelectorを使うと「does not exist on type ~」エラー出る。
// 参考：https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
// 型推論＆型エイリアス宣言。
// RootStateという型エイリアスを宣言
// store.getStateでstore自身からStateを取得して型推論。具体的にはsampleSliceのState型になる。
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

// カスタムフック定義＆型定義
// 素の `useDispatch`をuseAppDispatchという名前にしてカスタムフック定義、戻り値の型をAppDispatchに定義。
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector //「const useAppSelector = useSelector」に型定義TypedUseSelectorHook<RootState>を加えているだけ
export default store;