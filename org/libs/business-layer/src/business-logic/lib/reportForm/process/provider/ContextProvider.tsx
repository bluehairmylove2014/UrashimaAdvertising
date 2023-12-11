/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { ReportFormContext } from '../context/reportContext';
import { reportFormReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reportFormReducer, {
    isReportFormActive: false,
    reportTarget: 'AD',
    reportData: null,
    reportIdentificationData: null,
  });

  return (
    <ReportFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportFormContext.Provider>
  );
};
