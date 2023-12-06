// Import necessary modules and functions
import { useReportContext } from '../context';
import { ILocationReport } from '@business-layer/services/entities';

type useGetLocationReportsReturnType = ILocationReport[] | null;
export const useGetLocationReports = (): useGetLocationReportsReturnType => {
  const { state } = useReportContext();

  return state.locationReportData;
};
