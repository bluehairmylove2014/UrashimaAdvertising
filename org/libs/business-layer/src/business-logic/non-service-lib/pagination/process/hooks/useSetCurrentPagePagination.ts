import { usePaginationContext } from '../context';

type useSetCurrentPagePaginationReturnType = {
  handleChangeCurrentPage: (id: number, pageNumber: number) => void;
};
export const useSetCurrentPagePagination =
  (): useSetCurrentPagePaginationReturnType => {
    const { dispatch } = usePaginationContext();

    const handleChangeCurrentPage = (id: number, pageNumber: number): void => {
      dispatch({
        type: 'SET_CURRENT_PAGE',
        payload: {
          id,
          currentPage: pageNumber,
        },
      });
    };

    return {
      handleChangeCurrentPage,
    };
  };
