/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { ViewLocationMapContext } from '../context/context';
import { viewLocationMapReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(viewLocationMapReducer, {
    coord: [10.762538, 106.682448],
    isActive: false,
  });

  return (
    <ViewLocationMapContext.Provider value={{ state, dispatch }}>
      {children}
    </ViewLocationMapContext.Provider>
  );
};
