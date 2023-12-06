// Import necessary modules and functions
import { useReportContext } from '../context';
import { IAdReport } from '@business-layer/services/entities';

type useGetAdReportsReturnType = IAdReport[] | null;
export const useGetAdReports = (): useGetAdReportsReturnType => {
  const { state } = useReportContext();

  return state.adReportData;
};
