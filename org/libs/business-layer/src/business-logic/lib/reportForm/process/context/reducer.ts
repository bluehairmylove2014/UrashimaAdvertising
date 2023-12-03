import { ReportFormAction, ReportFormState } from '.';

export const reportFormReducer = (
  state: ReportFormState,
  action: ReportFormAction
): ReportFormState => {
  try {
    switch (action.type) {
      case 'SET_FORM_ACTIVE_ACTION':
        return { ...state, isReportFormActive: action.payload };
      case 'SET_REPORT_TARGET_ACTION':
        return { ...state, reportTarget: action.payload };
      case 'SET_ADDITION_DATA_ACTION':
        return { ...state, reportAdditionData: action.payload };
      case 'SET_ALL_ACTION':
        return action.payload;
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in reportFormReducer: ', error);
    return state;
  }
};
