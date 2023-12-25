import { useOfficerEditReportMutation } from '../../fetching/mutation';
import { editReportParamsType } from '@business-layer/services';

type useOfficerEditReportReturnType = {
  onOfficerEditReport: (reportData: editReportParamsType) => Promise<string>;
  isLoading: boolean;
};
export const useOfficerEditReport = (): useOfficerEditReportReturnType => {
  const officerEditReportMutation = useOfficerEditReportMutation();

  const onOfficerEditReport = (
    reportData: editReportParamsType
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      officerEditReportMutation
        .mutateAsync(reportData)
        .then((data) => resolve(data.message))
        .catch((error) => reject(error));
    });
  };

  return {
    onOfficerEditReport,
    isLoading: officerEditReportMutation.isPending,
  };
};
