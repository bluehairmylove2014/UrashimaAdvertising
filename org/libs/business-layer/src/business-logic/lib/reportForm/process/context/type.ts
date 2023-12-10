import { IAdsBoard, IAdsDetail } from '@business-layer/services/entities';

export type reportTargetType = 'LOCATION' | 'AD';
export type reportDataType = IAdsDetail | IAdsBoard | null;
export type reportIdentificationDataType =
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
  reportData: reportDataType;
  reportIdentificationData: reportIdentificationDataType;
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
      type: 'SET_IDENTIFICATION_DATA_ACTION';
      payload: ReportFormState['reportIdentificationData'];
    }
  | {
      type: 'SET_ALL_ACTION';
      payload: ReportFormState;
    };

export type ReportFormContextType = {
  state: ReportFormState;
  dispatch: React.Dispatch<ReportFormAction>;
};
