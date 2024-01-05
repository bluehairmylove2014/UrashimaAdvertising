// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { getAllSettingsResponseType } from '@business-layer/services';
import {
  useGetReportTypeSettingsMutation,
  useModifyReportTypeSettingsMutation,
} from '../../fetching/mutation';
import { useSettingContext } from '../context';
import { ISetting } from '@business-layer/services/entities';
import { useMemo } from 'react';

type useReportTypeSettingsReturnType = {
  contextData: ISetting[] | null;
  onGetReportTypeSettings: () => Promise<getAllSettingsResponseType>;
  onModifyReportTypeSetting: (setting: ISetting[]) => Promise<string>;
  isGetting: boolean;
  isModifying: boolean;
};
export const useReportTypeSettings = (): useReportTypeSettingsReturnType => {
  const getReportTypeSettingsMutation = useGetReportTypeSettingsMutation();
  const modifyReportTypeSettingMutation = useModifyReportTypeSettingsMutation();
  const { state, dispatch } = useSettingContext();

  const onGetReportTypeSettings = (): Promise<getAllSettingsResponseType> => {
    return new Promise((resolve, reject) => {
      getReportTypeSettingsMutation
        .mutateAsync({ token: getToken() })
        .then((data) => {
          dispatch({ type: 'SET_REPORT_TYPES', payload: data });
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };
  const onModifyReportTypeSetting = (setting: ISetting[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      modifyReportTypeSettingMutation
        .mutateAsync({ token: getToken(), modifyData: setting })
        .then((data) => {
          dispatch({ type: 'SET_REPORT_TYPES', payload: setting });
          resolve(data.message);
        })
        .catch((error) => reject(error));
    });
  };

  return {
    contextData: useMemo(() => state.reportTypes, [state.reportTypes]),
    onGetReportTypeSettings,
    onModifyReportTypeSetting,
    isGetting: getReportTypeSettingsMutation.isPending,
    isModifying: modifyReportTypeSettingMutation.isPending,
  };
};
