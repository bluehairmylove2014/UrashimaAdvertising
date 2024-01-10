import { RealtimeAction, RealtimeState } from '.';

export const realtimeReducer = (
  state: RealtimeState,
  action: RealtimeAction
): RealtimeState => {
  try {
    switch (action.type) {
      case 'SET_CONNECTION':
        return {
          ...state,
          connection: action.payload,
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in RealtimeReducer: ', error);
    return state;
  }
};
