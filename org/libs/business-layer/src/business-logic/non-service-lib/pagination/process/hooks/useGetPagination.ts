import { paginationVersionType, usePaginationContext } from '../context';

export const useGetPagination = (
  id: number
): paginationVersionType | undefined => {
  const { state } = usePaginationContext();
  return state.version.find((v) => v.id === id);
};
