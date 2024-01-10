/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { RealtimeContext } from '../context/context';
import { realtimeReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(realtimeReducer, {
    connection: null,
  });

  return (
    <RealtimeContext.Provider value={{ state, dispatch }}>
      {children}
    </RealtimeContext.Provider>
  );
};
