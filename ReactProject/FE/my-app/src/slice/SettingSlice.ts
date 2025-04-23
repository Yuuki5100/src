// SettingSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Setting {
    key: string;
    value: string;
}

interface SettingState {
    settings: Setting[];
    loading: boolean;
}

const initialState: SettingState = {
    settings: [],
    loading: false,
};

export const fetchSettings = createAsyncThunk('settings/fetch', async () => {
    const res = await axios.get<Setting[]>('/settings');
    return res.data;
});

export const updateSettingAPI = createAsyncThunk(
    'settings/update',
    async ({ key, value }: { key: string; value: string }) => {
        await axios.put('/settings', [{ key, value }]);
        return { key, value };
    }
);

export const SettingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.settings = action.payload;
                state.loading = false;
            })
            .addCase(updateSettingAPI.fulfilled, (state, action: PayloadAction<Setting>) => {
                const index = state.settings.findIndex(s => s.key === action.payload.key);
                if (index !== -1) {
                    state.settings[index].value = action.payload.value;
                }
            });
    },
});

export default SettingSlice.reducer;
