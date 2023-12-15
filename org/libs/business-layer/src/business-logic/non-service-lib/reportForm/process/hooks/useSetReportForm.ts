import { PaginationState, useReportFormContext } from '../context';

type useSetReportFormReturnType = {
  setForm: (formData: PaginationState) => void;
};
export const useSetReportForm = (): useSetReportFormReturnType => {
  const { dispatch } = useReportFormContext();

  const setForm = (formData: PaginationState): void => {
    dispatch({
      type: 'SET_ALL_ACTION',
      payload: {
        isReportFormActive: formData.isReportFormActive,
        reportTarget: formData.reportTarget,
        reportData: formData.reportData,
        reportIdentificationData: formData.reportIdentificationData,
      },
    });
  };

  return {
    setForm,
  };
};
