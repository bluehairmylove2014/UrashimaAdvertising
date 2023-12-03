export type reportTargetType = 'LOCATION' | 'AD';
export type reportAdditionDataType =
  | {
      adsBoardID: number;
      adsPointID: number;
    }
  | {
      latitude: number;
      longitude: number;
    }
  | null;

export interface ReportFormState {
  isReportFormActive: boolean;
  reportTarget: reportTargetType;
  reportAdditionData: reportAdditionDataType;
}

export type ReportFormAction =
  | {
      type: 'SET_FORM_ACTIVE_ACTION';
      payload: ReportFormState['isReportFormActive'];
    }
  | {
      type: 'SET_REPORT_TARGET_ACTION';
      payload: ReportFormState['reportTarget'];
    }
  | {
      type: 'SET_ADDITION_DATA_ACTION';
      payload: ReportFormState['reportAdditionData'];
    }
  | {
      type: 'SET_ALL_ACTION';
      payload: ReportFormState;
    };

export type ReportFormContextType = {
  state: ReportFormState;
  dispatch: React.Dispatch<ReportFormAction>;
};
