import { ReportFormState, useReportFormContext } from '../context';

export const useGetReportForm = (): ReportFormState => {
  const { state } = useReportFormContext();
  return state;
};
