/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { ReportContext } from '../context/reportContext';
import { reportReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reportReducer, {
    adReportData: null,
    locationReportData: null,
  });

  return (
    <ReportContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};
