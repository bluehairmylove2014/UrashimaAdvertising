import { IAdReport } from '@business-layer/services/entities';
import { LOCAL_STORAGE_KEYS } from '../../../../configs/constants';

export const addAdReportToLS = (adReportData: IAdReport) => {
  if (typeof window === 'undefined') return null;
  const oldReportsRaw = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.AD_REPORT
  );
  const oldReports = oldReportsRaw ? JSON.parse(oldReportsRaw) : [];
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.AD_REPORT,
    JSON.stringify([...oldReports, adReportData])
  );
};
export const getAdReportFromLS = (): IAdReport[] | null => {
  if (typeof window === 'undefined') return null;
  const oldReportsRaw = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.AD_REPORT
  );
  return oldReportsRaw ? JSON.parse(oldReportsRaw) : null;
};
export const setAdReportLS = (adReportsData: IAdReport[]) => {
  if (typeof window === 'undefined') return null;
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.AD_REPORT,
    JSON.stringify(adReportsData)
  );
};
