import { ApproveAction, ApproveState } from '.';

export const approveReducer = (
  state: ApproveState,
  action: ApproveAction
): ApproveState => {
  try {
    switch (action.type) {
      case 'SET_APPROVES':
        return {
          ...state,
          approves: action.payload,
        };
      case 'DELETE_APPROVE_BY_ID':
        return {
          ...state,
          approves: !state.approves
            ? state.approves
            : state.approves.filter((approve) => approve.id !== action.payload),
        };
      case 'FILTER_BY_SEARCH_KEY':
        return {
          ...state,
          filterCriteria: {
            ...state.filterCriteria,
            searchKey: action.payload,
          },
        };
      case 'FILTER_BY_TIME':
        return {
          ...state,
          filterCriteria: {
            ...state.filterCriteria,
            timeFilter: action.payload,
          },
        };
      case 'FILTER_BY_REQUEST_STATUS':
        return {
          ...state,
          filterCriteria: {
            ...state.filterCriteria,
            requestStatusFilter: action.payload,
          },
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in approveReducer: ', error);
    return state;
  }
};
