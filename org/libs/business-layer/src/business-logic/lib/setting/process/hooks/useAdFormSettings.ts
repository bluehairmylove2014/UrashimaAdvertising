// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { getAllSettingsResponseType } from '@business-layer/services';
import {
  useGetAdFormSettingsMutation,
  useModifyAdFormSettingsMutation,
} from '../../fetching/mutation';
import { useSettingContext } from '../context';
import { ISetting } from '@business-layer/services/entities';
import { useMemo } from 'react';

type useAdFormSettingsReturnType = {
  contextData: ISetting[] | null;
  onGetAdFormSetting: () => Promise<getAllSettingsResponseType>;
  onModifyAdFormSetting: (setting: ISetting[]) => Promise<string>;
  isGetting: boolean;
  isModifying: boolean;
};
export const useAdFormSettings = (): useAdFormSettingsReturnType => {
  const getAdFormSettingsMutation = useGetAdFormSettingsMutation();
  const modifyAdFormSettingMutation = useModifyAdFormSettingsMutation();
  const { state, dispatch } = useSettingContext();

  const onGetAdFormSetting = (): Promise<getAllSettingsResponseType> => {
    return new Promise((resolve, reject) => {
      getAdFormSettingsMutation
          .mutateAsync({ token: getToken() })
          .then((data) => {
            dispatch({ type: 'SET_AD_FORMS', payload: data });
            resolve(data);
          })
          .catch((error) => reject(error));
    });
  };
  const onModifyAdFormSetting = (setting: ISetting[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      modifyAdFormSettingMutation
        .mutateAsync({ token: getToken(), modifyData: setting })
        .then((data) => {
          dispatch({ type: 'SET_AD_FORMS', payload: setting });
          resolve(data.message);
        })
        .catch((error) => reject(error));
    });
  };

  return {
    contextData: useMemo(() => state.adForms, [state.adForms]),
    onGetAdFormSetting,
    onModifyAdFormSetting,
    isGetting: getAdFormSettingsMutation.isPending,
    isModifying: modifyAdFormSettingMutation.isPending,
  };
};
