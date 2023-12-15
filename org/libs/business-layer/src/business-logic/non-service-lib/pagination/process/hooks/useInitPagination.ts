// Import necessary modules and functions

import { IPagination } from '@business-layer/services/entities';
import { usePaginationContext } from '../context';

type useInitPaginationReturnType = {
  initPagination: (params: useInitPaginationParamsType) => number;
};
type useInitPaginationParamsType = IPagination;
export const useInitPagination = (): useInitPaginationReturnType => {
  const { state, dispatch } = usePaginationContext();

  const initPagination = (params: useInitPaginationParamsType): number => {
    dispatch({
      type: 'INIT_INSTANCE',
      payload: params,
    });
    return state.version.length + 1;
  };

  return {
    initPagination,
  };
};
