// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { getAllSettingsResponseType } from '@business-layer/services';
import {
  useGetLocationSettingsMutation,
  useModifyLocationSettingsMutation,
} from '../../fetching/mutation';
import { useSettingContext } from '../context';
import { ISetting } from '@business-layer/services/entities';
import { useMemo } from 'react';

type useLocationSettingsReturnType = {
  contextData: ISetting[] | null;
  onGetLocationSetting: () => Promise<getAllSettingsResponseType>;
  onModifyLocationSetting: (setting: ISetting[]) => Promise<string>;
  isGetting: boolean;
  isModifying: boolean;
};
export const useLocationSettings = (): useLocationSettingsReturnType => {
  const getLocationSettingMutation = useGetLocationSettingsMutation();
  const modifyLocationSettingMutation = useModifyLocationSettingsMutation();
  const { state, dispatch } = useSettingContext();

  const onGetLocationSetting = (): Promise<getAllSettingsResponseType> => {
    return new Promise((resolve, reject) => {
      getLocationSettingMutation
          .mutateAsync({ token: getToken() })
          .then((data) => {
            dispatch({ type: 'SET_LOCATION_TYPES', payload: data });
            resolve(data);
          })
          .catch((error) => reject(error));
    });
  };
  const onModifyLocationSetting = (setting: ISetting[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      modifyLocationSettingMutation
        .mutateAsync({ token: getToken(), modifyData: setting })
        .then((data) => {
          dispatch({ type: 'SET_LOCATION_TYPES', payload: setting });
          resolve(data.message);
        })
        .catch((error) => reject(error));
    });
  };

  return {
    contextData: useMemo(() => state.locationTypes, [state.locationTypes]),
    onGetLocationSetting,
    onModifyLocationSetting,
    isGetting: getLocationSettingMutation.isPending,
    isModifying: modifyLocationSettingMutation.isPending,
  };
};
