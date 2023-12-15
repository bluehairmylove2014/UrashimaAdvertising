import { PaginationAction, PaginationState } from '.';

export const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  try {
    switch (action.type) {
      case 'INIT_INSTANCE':
        return {
          ...state,
          version: [
            ...state.version,
            { id: state.version.length + 1, data: action.payload },
          ],
        };
      case 'SET_PAGINATION_DATA':
        return {
          ...state,
          version: state.version.map((v) => {
            return v.id === action.payload.id
              ? { ...v, data: action.payload.data }
              : v;
          }),
        };
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          version: state.version.map((v) => {
            return v.id === action.payload.id
              ? {
                  ...v,
                  data: {
                    ...v.data,
                    currentPage: action.payload.currentPage,
                  },
                }
              : v;
          }),
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in paginationReducer: ', error);
    return state;
  }
};
