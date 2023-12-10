import React from 'react';
import { useContext } from 'react';
import { ReportFormContextType } from './type';

export const ReportFormContext = React.createContext<ReportFormContextType>({
  state: {
    isReportFormActive: false,
    reportTarget: 'AD',
    reportIdentificationData: null,
  },
  dispatch: () => undefined,
});

export const useReportFormContext = () => {
  const context = useContext(ReportFormContext);
  if (context === undefined) {
    throw new Error(
      'useReportFormContext must be used within a ReportFormProvider'
    );
  }
  return context;
};
