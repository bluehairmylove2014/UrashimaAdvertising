import { ISetting } from '@business-layer/services/entities';

export interface SettingState {
  locationTypes: ISetting[] | null;
  adForms: ISetting[] | null;
  adBoardTypes: ISetting[] | null;
  reportTypes: ISetting[] | null;
}

export type SettingAction =
  | {
      type: 'SET_LOCATION_TYPES';
      payload: SettingState['locationTypes'];
    }
  | {
      type: 'SET_AD_FORMS';
      payload: SettingState['adForms'];
    }
  | {
      type: 'SET_AD_BOARD_TYPES';
      payload: SettingState['adBoardTypes'];
    }
  | {
      type: 'SET_REPORT_TYPES';
      payload: SettingState['reportTypes'];
    };

export type SettingContextType = {
  state: SettingState;
  dispatch: React.Dispatch<SettingAction>;
};
