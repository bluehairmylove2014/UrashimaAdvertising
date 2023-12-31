import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useOfficerEditReportMutation } from '../../fetching/mutation';
import { IOfficerReport } from '@business-layer/services/entities';

type useOfficerEditReportReturnType = {
  onOfficerEditReport: (reportData: IOfficerReport) => Promise<string>;
  isLoading: boolean;
};
export const useOfficerEditReport = (): useOfficerEditReportReturnType => {
  const officerEditReportMutation = useOfficerEditReportMutation();

  const onOfficerEditReport = (reportData: IOfficerReport): Promise<string> => {
    return new Promise((resolve, reject) => {
      officerEditReportMutation
        .mutateAsync({ data: reportData, token: getToken() })
        .then((data) => resolve(data.message))
        .catch((error) => reject(error));
    });
  };

  return {
    onOfficerEditReport,
    isLoading: officerEditReportMutation.isPending,
  };
};
