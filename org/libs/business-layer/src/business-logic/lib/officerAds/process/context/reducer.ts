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
          backupAdLocation: action.payload,
          adLocations: action.payload,
        };
      case 'SET_SEARCH_KEY_FILTER_AD_LOCATION':
        return {
          ...state,
          adLocationFilterCriteria: {
            ...state.adLocationFilterCriteria,
            searchKey: action.payload,
          },
        };
      case 'SET_ADS_FORM_FILTER_AD_LOCATION':
        return {
          ...state,
          adLocationFilterCriteria: {
            ...state.adLocationFilterCriteria,
            adsForm: action.payload,
          },
        };
      case 'SET_LOCATION_TYPE_FILTER_AD_LOCATION':
        return {
          ...state,
          adLocationFilterCriteria: {
            ...state.adLocationFilterCriteria,
            locationType: action.payload,
          },
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in officerAdReducer: ', error);
    return state;
  }
};
