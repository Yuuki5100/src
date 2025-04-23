// useSetting.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchSettings, updateSettingAPI } from './SettingSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useSetting = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector((state: RootState) => state.setting.settings);
  const loading = useSelector((state: RootState) => state.setting.loading);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const updateSetting = (key: string, value: string, commit: boolean) => {
    if (commit) {
      dispatch(updateSettingAPI({ key, value }));
    }
  };

  const reloadMailTemplates = async () => {
    await axios.post('/mail-templates/reload');
    alert('テンプレートキャッシュを再読み込みしました');
  };

  const navigateToErrorCodes = () => {
    navigate('/error-codes');
  };

  return {
    settings,
    loading,
    updateSetting,
    reloadMailTemplates,
    navigateToErrorCodes,
  };
};
