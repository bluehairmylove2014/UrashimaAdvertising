// Import necessary modules and functions
import { useReportContext } from '../context';
import { useReportLocationMutation } from '../../fetching/mutation';
import { addLocationReportToLS } from '../helpers/locationReportLocalstorage';
import { ILocationReport } from '@business-layer/services/entities';

type useReportLocationReturnType = {
  onReportLocation: ({
    latitude,
    longitude,
    reportType,
    name,
    email,
    phone,
    content,
    images,
  }: ILocationReport) => Promise<string>;
  isLoading: boolean;
};
export const useReportLocation = (): useReportLocationReturnType => {
  const reportLocationMutation = useReportLocationMutation();
  const { dispatch } = useReportContext();

  /**
   * 
   * data: {
    latitude,
    longitude,
    reportType,
    name,
    email,
    phone,
    content,
    images,
  }
   */
  const onReportLocation = (reportData: ILocationReport): Promise<string> => {
    return new Promise((resolve, reject) => {
      const { reportData: reportTargetData, ...reportWithoutTargetData } =
        reportData;
      reportLocationMutation
        .mutateAsync(reportWithoutTargetData)
        .then((data) => {
          dispatch({
            type: 'ADD_LOCATION_REPORT_ACTION',
            payload: reportData,
          });
          addLocationReportToLS(reportData);
          resolve(data.message);
        })
        .catch((error) => reject(error));
    });
  };

  return {
    onReportLocation,
    isLoading: reportLocationMutation.isPending,
  };
};
