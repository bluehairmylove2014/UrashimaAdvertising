import { IAdReport, ILocationReport } from '@business-layer/services/entities';

import {
  IOfficerReport,
  IOfficerReportDetail,
} from '@business-layer/services/entities';

export type reportResponseType = {
  message: string;
};
export type reportAdParamsType = Pick<
  IAdReport,
  Exclude<keyof IAdReport, 'reportData'>
>;
export type reportLocationParamsType = Pick<
  ILocationReport,
  Exclude<keyof ILocationReport, 'reportData'>
>;

export type getAllOfficerReportsResponseType = IOfficerReport[];
export type getOfficerReportDetailResponseType = IOfficerReportDetail;

export type editReportParamsType = IOfficerReport;
export type editReportResponseType = {
  message: string;
};
