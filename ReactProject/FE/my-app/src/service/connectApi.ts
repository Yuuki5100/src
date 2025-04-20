import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getRouteApiFunc = (): Promise<string> => {
    return axios.get('http://localhost:8080')
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

//createAsyncThunk(第1引数：文字列, 第2引数：Promiseを返す非同期関数)
export const getRouteApi = createAsyncThunk(
    'route/getApi',
    getRouteApiFunc
);