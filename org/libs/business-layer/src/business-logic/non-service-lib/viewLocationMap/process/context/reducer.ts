import { ViewLocationMapAction, ViewLocationMapState } from '.';

export const viewLocationMapReducer = (
  state: ViewLocationMapState,
  action: ViewLocationMapAction
): ViewLocationMapState => {
  try {
    switch (action.type) {
      case 'SET_COORD':
        return {
          ...state,
          coord: action.payload,
        };
      case 'SET_IS_ACTIVE':
        return {
          ...state,
          isActive: action.payload,
        };
      case 'SET_IS_SELECTING':
        return {
          ...state,
          isSelectingLocation: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in ViewLocationMapReducer: ', error);
    return state;
  }
};
