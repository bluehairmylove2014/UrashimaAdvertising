import { ILocationReport } from '@business-layer/services/entities';
import { LOCAL_STORAGE_KEYS } from '../../../../configs/constants';

export const addLocationReportToLS = (LocationReportData: ILocationReport) => {
  if (typeof window === 'undefined') return null;
  const oldReportsRaw = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.LOCATION_REPORT
  );
  const oldReports = oldReportsRaw ? JSON.parse(oldReportsRaw) : [];
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.LOCATION_REPORT,
    JSON.stringify([...oldReports, LocationReportData])
  );
};
export const getLocationReportFromLS = (): ILocationReport[] | null => {
  if (typeof window === 'undefined') return null;
  const oldReportsRaw = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.LOCATION_REPORT
  );
  return oldReportsRaw ? JSON.parse(oldReportsRaw) : null;
};
export const setLocationReportLS = (LocationReportsData: ILocationReport[]) => {
  if (typeof window === 'undefined') return null;
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.LOCATION_REPORT,
    JSON.stringify(LocationReportsData)
  );
};
