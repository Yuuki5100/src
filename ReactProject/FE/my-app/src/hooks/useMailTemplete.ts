// useMailTemplete.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
    fetchMailTemplete,
    saveMailTemplete,
    setTemplateName,
    setLocale,
    setSubject,
    setBody
} from './MailTempleteSlice';
import { useEffect } from 'react';
import axios from 'axios';

export const useMailTemplete = () => {
    const dispatch: AppDispatch = useDispatch();
    const { current, templates, locales } = useSelector((state: RootState) => state.mailTemplete);

    useEffect(() => {
        if (current.templateName && current.locale) {
            dispatch(fetchMailTemplete({ templateName: current.templateName, locale: current.locale }));
        }
    }, [current.templateName, current.locale, dispatch]);

    const saveTemplate = () => {
        dispatch(saveMailTemplete(current));
    };

    const reloadTemplates = async () => {
        await axios.post('/mail-templates/reload');
        alert('テンプレートキャッシュを再読み込みしました');
    };

    const previewTemplate = async () => {
        const res = await axios.post('/mail-templates/preview', current);
        alert(`プレビュー: \\n件名: ${res.data.subject}\\n本文: ${res.data.body}`);
    };

    return {
        templates,
        locales,
        selectedTemplate: current.templateName,
        setSelectedTemplate: (val: string) => dispatch(setTemplateName(val)),
        selectedLocale: current.locale,
        setSelectedLocale: (val: string) => dispatch(setLocale(val)),
        subject: current.subject,
        setSubject: (val: string) => dispatch(setSubject(val)),
        body: current.body,
        setBody: (val: string) => dispatch(setBody(val)),
        saveTemplate,
        reloadTemplates,
        previewTemplate,
    };
};
