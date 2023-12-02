import { useMutation } from '@tanstack/react-query';
import {
  ReportService,
  reportAdParamsType,
  reportLocationParamsType,
  reportResponseType,
} from '@business-layer/services';

const reportService = new ReportService();

export const useReportAdMutation = () => {
  return useMutation<reportResponseType, Error, reportAdParamsType, unknown>({
    mutationFn: reportService.reportAd,
  });
};
export const useReportLocationMutation = () => {
  return useMutation<
    reportResponseType,
    Error,
    reportLocationParamsType,
    unknown
  >({
    mutationFn: reportService.reportLocation,
  });
};
