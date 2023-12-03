import { IAdReport, ILocationReport } from '@business-layer/services/entities';

export interface ReportState {
  adReportData: IAdReport[] | null;
  locationReportData: ILocationReport[] | null;
}

export type ReportAction =
  | {
      type: 'SET_AD_REPORT_ACTION';
      payload: ReportState['adReportData'];
    }
  | {
      type: 'ADD_AD_REPORT_ACTION';
      payload: IAdReport;
    }
  | {
      type: 'SET_LOCATION_REPORT_ACTION';
      payload: ReportState['locationReportData'];
    }
  | {
      type: 'ADD_LOCATION_REPORT_ACTION';
      payload: ILocationReport;
    };

export type ReportContextType = {
  state: ReportState;
  dispatch: React.Dispatch<ReportAction>;
};
