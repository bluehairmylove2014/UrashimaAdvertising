import { OfficerAdAction, OfficerAdState } from '.';

export const officerAdReducer = (
  state: OfficerAdState,
  action: OfficerAdAction
): OfficerAdState => {
  try {
    switch (action.type) {
      case 'SET_AD_LOCATIONS':
        return {
          ...state,
          adLocations: action.payload,
        };
      case 'SET_AD_LOCATIONS_DETAIL':
        return {
          ...state,
          adLocationsDetail: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in officerAdReducer: ', error);
    return state;
  }
};
