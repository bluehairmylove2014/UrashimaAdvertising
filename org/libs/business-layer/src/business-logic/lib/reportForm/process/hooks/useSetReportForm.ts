import { ReportFormState, useReportFormContext } from '../context';

type useSetReportFormReturnType = {
  setForm: (formData: ReportFormState) => void;
};
export const useSetReportForm = (): useSetReportFormReturnType => {
  const { dispatch } = useReportFormContext();

  const setForm = (formData: ReportFormState): void => {
    dispatch({
      type: 'SET_ALL_ACTION',
      payload: {
        isReportFormActive: formData.isReportFormActive,
        reportTarget: formData.reportTarget,
        reportAdditionData: formData.reportAdditionData,
      },
    });
  };

  return {
    setForm,
  };
};
