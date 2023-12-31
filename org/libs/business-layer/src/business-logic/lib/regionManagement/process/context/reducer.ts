import { RegionManagementAction, RegionManagementState } from '.';

export const regionManagementReducer = (
  state: RegionManagementState,
  action: RegionManagementAction
): RegionManagementState => {
  try {
    switch (action.type) {
      case 'SET_REGIONS':
        return { ...state, regions: action.payload };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in regionManagementReducer: ', error);
    return state;
  }
};
