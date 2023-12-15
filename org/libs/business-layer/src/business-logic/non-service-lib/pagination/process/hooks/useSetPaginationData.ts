import { IPagination } from '@business-layer/services/entities';
import { usePaginationContext } from '../context';

type useSetPaginationDataReturnType = {
  setPaginationData: (id: number, data: IPagination) => void;
};
export const useSetPaginationData = (): useSetPaginationDataReturnType => {
  const { dispatch } = usePaginationContext();

  const setPaginationData = (id: number, data: IPagination): void => {
    dispatch({
      type: 'SET_PAGINATION_DATA',
      payload: {
        id,
        data,
      },
    });
  };

  return {
    setPaginationData,
  };
};
