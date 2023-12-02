// Import necessary modules and functions
import { reportAdParamsType } from '@business-layer/services';
import { useReportContext } from '../context';
import { useReportAdMutation } from '../../fetching/mutation';
import { addAdReportToLS } from '../helpers/adReportLocalstorage';

type useReportAdReturnType = {
  onReportAd: ({
    adsBoardID,
    adsPointID,
    reportType,
    name,
    email,
    phone,
    content,
    images,
  }: reportAdParamsType) => Promise<string>;
  isLoading: boolean;
};
export const useReportAd = (): useReportAdReturnType => {
  const reportAdMutation = useReportAdMutation();
  const { dispatch } = useReportContext();

  /**
   * 
   * data: {
    adsBoardID,
    adsPointID,
    reportType,
    name,
    email,
    phone,
    content,
    images,
  }
   */
  const onReportAd = (reportData: reportAdParamsType): Promise<string> => {
    return new Promise((resolve, reject) => {
      reportAdMutation
        .mutateAsync(reportData)
        .then((data) => {
          dispatch({
            type: 'ADD_AD_REPORT_ACTION',
            payload: reportData,
          });
          addAdReportToLS(reportData);
          resolve(data.message);
        })
        .catch((error) => reject(error));
    });
  };

  return {
    onReportAd,
    isLoading: reportAdMutation.isPending,
  };
};
