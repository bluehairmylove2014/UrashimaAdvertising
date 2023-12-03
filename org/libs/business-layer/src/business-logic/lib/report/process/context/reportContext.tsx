import React from 'react';
import { useContext } from 'react';
import { ReportContextType } from './type';

export const ReportContext = React.createContext<ReportContextType>({
  state: {
    adReportData: null,
    locationReportData: null,
  },
  dispatch: () => undefined,
});

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useAdsContext must be used within a AdsProvider');
  }
  return context;
};
