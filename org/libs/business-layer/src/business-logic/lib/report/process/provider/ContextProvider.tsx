/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { ReportContext } from '../context/reportContext';
import { reportReducer } from '../context/reducer';
import { getAdReportFromLS } from '../helpers/adReportLocalstorage';
import { getLocationReportFromLS } from '../helpers/locationReportLocalstorage';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reportReducer, {
    adReportData: getAdReportFromLS(),
    locationReportData: getLocationReportFromLS(),
  });

  return (
    <ReportContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};
