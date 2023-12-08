// Import necessary modules and functions
import { reportLocationParamsType } from '@business-layer/services';
import { useReportContext } from '../context';
import { useReportLocationMutation } from '../../fetching/mutation';
import { addLocationReportToLS } from '../helpers/locationReportLocalstorage';

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
  }: reportLocationParamsType) => Promise<string>;
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
  const onReportLocation = (
    reportData: reportLocationParamsType
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      reportLocationMutation
        .mutateAsync(reportData)
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
