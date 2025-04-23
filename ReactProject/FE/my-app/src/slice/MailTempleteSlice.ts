// MailTempleteSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MailTemplete {
    templateName: string;
    locale: string;
    subject: string;
    body: string;
}

interface MailTempleteState {
    current: MailTemplete;
    templates: string[];
    locales: string[];
}

const initialState: MailTempleteState = {
    current: {
        templateName: '',
        locale: '',
        subject: '',
        body: '',
    },
    templates: ['user_welcome', 'password_reset'],
    locales: ['ja', 'en'],
};

export const fetchMailTemplete = createAsyncThunk(
    'mailTemplete/fetch',
    async ({ templateName, locale }: { templateName: string; locale: string }) => {
        const res = await axios.get<MailTemplete[]>('/mail-templates');
        return res.data.find(t => t.templateName === templateName && t.locale === locale);
    }
);

export const saveMailTemplete = createAsyncThunk(
    'mailTemplete/save',
    async (templete: MailTemplete) => {
        await axios.put(`/mail-templates/${templete.templateName}`, templete);
        return templete;
    }
);

export const MailTempleteSlice = createSlice({
    name: 'mailTemplete',
    initialState,
    reducers: {
        setTemplateName: (state, action: PayloadAction<string>) => {
            state.current.templateName = action.payload;
        },
        setLocale: (state, action: PayloadAction<string>) => {
            state.current.locale = action.payload;
        },
        setSubject: (state, action: PayloadAction<string>) => {
            state.current.subject = action.payload;
        },
        setBody: (state, action: PayloadAction<string>) => {
            state.current.body = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMailTemplete.fulfilled, (state, action) => {
            if (action.payload) state.current = action.payload;
        });
    },
});

export const {
    setTemplateName,
    setLocale,
    setSubject,
    setBody,
} = MailTempleteSlice.actions;

export default MailTempleteSlice.reducer;
