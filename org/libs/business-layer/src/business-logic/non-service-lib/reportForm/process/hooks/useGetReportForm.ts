import { PaginationState, useReportFormContext } from '../context';

export const useGetReportForm = (): PaginationState => {
  const { state } = useReportFormContext();
  return state;
};
