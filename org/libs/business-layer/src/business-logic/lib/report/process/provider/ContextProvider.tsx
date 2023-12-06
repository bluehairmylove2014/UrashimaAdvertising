/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { ReportContext } from '../context/reportContext';
import { reportReducer } from '../context/reducer';
import { LOCAL_STORAGE_KEYS } from './../../../../configs/constants';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const adReportRaw = localStorage.getItem(LOCAL_STORAGE_KEYS.AD_REPORT);
  const locationReportRaw = localStorage.getItem(
    LOCAL_STORAGE_KEYS.LOCATION_REPORT
  );
  const [state, dispatch] = useReducer(reportReducer, {
    adReportData: adReportRaw ? JSON.parse(adReportRaw) : null,
    locationReportData: locationReportRaw
      ? JSON.parse(locationReportRaw)
      : null,
  });

  return (
    <ReportContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};
