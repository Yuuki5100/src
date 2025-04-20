import { createSlice } from "@reduxjs/toolkit";
import { getRouteApi } from "./service/connectApi";


export const sampleSlice = createSlice({
    name: 'sample',
    initialState: {
        status: '',
        result: ''
    },
    // ノーマルReducerの登録場所（同期処理）
    reducers: {},
    // extraReducerの登録場所（非同期処理）
    extraReducers: (builder) => {
        builder.addCase(getRouteApi.pending, (state) => {
            state.status = 'Loading';
        })
        .addCase(getRouteApi.fulfilled, (state, action) => {
            state.status = 'Finished';
            state.result = action.payload;
        })
        .addCase(getRouteApi.rejected, (state) => {
            state.status = 'Failed';
        })
    }
})