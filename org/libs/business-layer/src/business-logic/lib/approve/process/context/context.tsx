import React from 'react';
import { useContext } from 'react';
import { ApproveContextType } from './type';

export const ApproveContext = React.createContext<ApproveContextType>({
  state: {
    approves: null,
    filterCriteria: {
      searchKey: null,
      timeFilter: null,
      requestStatusFilter: null,
    },
  },
  dispatch: () => undefined,
});

export const useApproveContext = () => {
  const context = useContext(ApproveContext);
  if (context === undefined) {
    throw new Error('useApproveContext must be used within a ApproveProvider');
  }
  return context;
};
