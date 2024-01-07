import { ISetting } from '@business-layer/services/entities';

export type getAllSettingsResponseType = ISetting[];
export type getAllSettingsPropsType = {
  token: string | null;
};
export type modifySettingsPropsType = {
  token: string | null;
  modifyData: ISetting[];
};
export type modifySettingsResponseType = {
  message: string;
};
