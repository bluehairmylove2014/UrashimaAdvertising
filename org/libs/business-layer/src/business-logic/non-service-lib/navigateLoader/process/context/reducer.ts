import { NavigateLoaderAction, NavigateLoaderState } from '.';

export const navigateLoaderReducer = (
  state: NavigateLoaderState,
  action: NavigateLoaderAction
): NavigateLoaderState => {
  try {
    switch (action.type) {
      case 'SET_IS_ACTIVE':
        return {
          ...state,
          isActive: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in NavigateLoaderReducer: ', error);
    return state;
  }
};
