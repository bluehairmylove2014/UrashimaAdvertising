// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { getAllSettingsResponseType } from '@business-layer/services';
import {
  useGetAdBoardTypeSettingsMutation,
  useModifyAdBoardTypeSettingsMutation,
} from '../../fetching/mutation';
import { useSettingContext } from '../context';
import { ISetting } from '@business-layer/services/entities';
import { useMemo } from 'react';

type useAdBoardTypeSettingsReturnType = {
  contextData: ISetting[] | null;
  onGetAdBoardTypeSettings: () => Promise<getAllSettingsResponseType>;
  onModifyAdBoardSetting: (setting: ISetting[]) => Promise<string>;
  isGetting: boolean;
  isModifying: boolean;
};
export const useAdBoardTypeSettings = (): useAdBoardTypeSettingsReturnType => {
  const getAdBoardTypeSettingsMutation = useGetAdBoardTypeSettingsMutation();
  const modifyAdBoardSettingMutation = useModifyAdBoardTypeSettingsMutation();
  const { state, dispatch } = useSettingContext();

  const onGetAdBoardTypeSettings = (): Promise<getAllSettingsResponseType> => {
    return new Promise((resolve, reject) => {
      getAdBoardTypeSettingsMutation
          .mutateAsync({ token: getToken() })
          .then((data) => {
            dispatch({ type: 'SET_AD_BOARD_TYPES', payload: data });
            resolve(data);
          })
          .catch((error) => reject(error));
    });
  };
  const onModifyAdBoardSetting = (setting: ISetting[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      modifyAdBoardSettingMutation
        .mutateAsync({ token: getToken(), modifyData: setting })
        .then((data) => {
          dispatch({ type: 'SET_AD_BOARD_TYPES', payload: setting });
          resolve(data.message);
        })
        .catch((error) => reject(error));
    });
  };

  return {
    contextData: useMemo(() => state.adBoardTypes, [state.adBoardTypes]),
    onGetAdBoardTypeSettings,
    onModifyAdBoardSetting,
    isGetting: getAdBoardTypeSettingsMutation.isPending,
    isModifying: modifyAdBoardSettingMutation.isPending,
  };
};
