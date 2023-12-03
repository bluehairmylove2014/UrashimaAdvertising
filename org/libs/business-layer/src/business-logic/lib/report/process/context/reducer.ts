import { ReportAction, ReportState } from '.';

export const reportReducer = (
  state: ReportState,
  action: ReportAction
): ReportState => {
  try {
    switch (action.type) {
      case 'SET_AD_REPORT_ACTION':
        return {
          ...state,
          adReportData: action.payload,
        };
      case 'ADD_AD_REPORT_ACTION':
        return {
          ...state,
          adReportData: state.adReportData
            ? [action.payload, ...state.adReportData]
            : [action.payload],
        };
      case 'SET_LOCATION_REPORT_ACTION':
        return {
          ...state,
          locationReportData: action.payload,
        };
      case 'ADD_LOCATION_REPORT_ACTION':
        return {
          ...state,
          locationReportData: state.locationReportData
            ? [action.payload, ...state.locationReportData]
            : [action.payload],
        };
      default:
        return state;
    }
  } catch (error) {
    console.error('Error in reportReducer: ', error);
    return state;
  }
};
