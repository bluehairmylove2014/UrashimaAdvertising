import { useMutation } from '@tanstack/react-query';
import {
  SettingService,
  getAllSettingsPropsType,
  getAllSettingsResponseType,
  modifySettingsPropsType,
  modifySettingsResponseType,
} from '@business-layer/services';

const settingService = new SettingService();

export const useGetLocationSettingsMutation = () => {
  return useMutation<
    getAllSettingsResponseType,
    Error,
    getAllSettingsPropsType,
    unknown
  >({
    mutationFn: settingService.getLocationSettings,
  });
};

export const useGetAdFormSettingsMutation = () => {
  return useMutation<
    getAllSettingsResponseType,
    Error,
    getAllSettingsPropsType,
    unknown
  >({
    mutationFn: settingService.getAdFormsSettings,
  });
};

export const useGetAdBoardTypeSettingsMutation = () => {
  return useMutation<
    getAllSettingsResponseType,
    Error,
    getAllSettingsPropsType,
    unknown
  >({
    mutationFn: settingService.getAdBoardTypesSettings,
  });
};

export const useGetReportTypeSettingsMutation = () => {
  return useMutation<
    getAllSettingsResponseType,
    Error,
    getAllSettingsPropsType,
    unknown
  >({
    mutationFn: settingService.getReportTypesSettings,
  });
};

export const useModifyLocationSettingsMutation = () => {
  return useMutation<
    modifySettingsResponseType,
    Error,
    modifySettingsPropsType,
    unknown
  >({
    mutationFn: settingService.modifyLocationSettings,
  });
};

export const useModifyAdFormSettingsMutation = () => {
  return useMutation<
    modifySettingsResponseType,
    Error,
    modifySettingsPropsType,
    unknown
  >({
    mutationFn: settingService.modifyAdFormsSettings,
  });
};

export const useModifyAdBoardTypeSettingsMutation = () => {
  return useMutation<
    modifySettingsResponseType,
    Error,
    modifySettingsPropsType,
    unknown
  >({
    mutationFn: settingService.modifyAdBoardTypesSettings,
  });
};

export const useModifyReportTypeSettingsMutation = () => {
  return useMutation<
    modifySettingsResponseType,
    Error,
    modifySettingsPropsType,
    unknown
  >({
    mutationFn: settingService.modifyReportTypesSettings,
  });
};
