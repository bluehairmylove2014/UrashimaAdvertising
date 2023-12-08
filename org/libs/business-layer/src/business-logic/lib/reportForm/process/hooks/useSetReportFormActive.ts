import { useReportFormContext } from '../context';

type useSetReportFormActiveReturnType = {
  activateForm: () => void;
  unActivateForm: () => void;
};
export const useSetReportFormActive = (): useSetReportFormActiveReturnType => {
  const { dispatch } = useReportFormContext();

  const activateForm = (): void => {
    dispatch({
      type: 'SET_FORM_ACTIVE_ACTION',
      payload: true,
    });
  };
  const unActivateForm = (): void => {
    dispatch({
      type: 'SET_FORM_ACTIVE_ACTION',
      payload: false,
    });
  };

  return {
    activateForm,
    unActivateForm,
  };
};
