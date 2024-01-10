// Import necessary modules and functions
import { useReportContext } from '../context';
import { useReportAdMutation } from '../../fetching/mutation';
import { addAdReportToLS } from '../helpers/adReportLocalstorage';
import { IAdReport } from '@business-layer/services/entities';
import { useSendMsgToOfficer } from '@business-layer/business-logic/realtime';

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
  }: IAdReport) => Promise<string>;
  isLoading: boolean;
};
export const useReportAd = (): useReportAdReturnType => {
  const reportAdMutation = useReportAdMutation();
  const { dispatch } = useReportContext();
  const { onSendMsg } = useSendMsgToOfficer();

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
  const onReportAd = (reportData: IAdReport): Promise<string> => {
    return new Promise((resolve, reject) => {
      const { reportData: reportTargetData, ...reportWithoutTargetData } =
        reportData;
      reportAdMutation
        .mutateAsync(reportWithoutTargetData)
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
