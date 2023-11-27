import { AdsAction, AdsState } from '.';

export const adsReducer = (state: AdsState, action: AdsAction): AdsState => {
  try {
    switch (action.type) {
      case 'SET_ADS_ACTION':
        return {
          ...state,
          adsData: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in adsReducer: ', error);
    return state;
  }
};
