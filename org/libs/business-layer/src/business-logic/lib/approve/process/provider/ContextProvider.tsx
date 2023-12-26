/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { ApproveContext } from '../context/context';
import { approveReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(approveReducer, {
    approves: null,
    filterCriteria: {
      searchKey: null,
      timeFilter: null,
      requestStatusFilter: null,
    },
  });

  return (
    <ApproveContext.Provider value={{ state, dispatch }}>
      {children}
    </ApproveContext.Provider>
  );
};
