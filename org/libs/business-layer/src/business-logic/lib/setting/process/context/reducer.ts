import { SettingAction, SettingState } from '.';

export const settingReducer = (
  state: SettingState,
  action: SettingAction
): SettingState => {
  try {
    switch (action.type) {
      case 'SET_LOCATION_TYPES':
        return { ...state, locationTypes: action.payload };
      case 'SET_AD_FORMS':
        return { ...state, adForms: action.payload };
      case 'SET_AD_BOARD_TYPES':
        return { ...state, adBoardTypes: action.payload };
      case 'SET_REPORT_TYPES':
        return { ...state, reportTypes: action.payload };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in regionManagementReducer: ', error);
    return state;
  }
};
