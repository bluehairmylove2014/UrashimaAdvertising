import { useMutation } from '@tanstack/react-query';
import {
  ReportService,
  editReportParamsType,
  editReportResponseType,
} from '@business-layer/services';

const reportService = new ReportService();

export const useOfficerEditReportMutation = () => {
  return useMutation<
    editReportResponseType,
    Error,
    editReportParamsType,
    unknown
  >({
    mutationFn: reportService.officerEditReport,
  });
};
