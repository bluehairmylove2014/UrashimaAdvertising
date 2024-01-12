/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { NavigateLoaderContext } from '../context/context';
import { navigateLoaderReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(navigateLoaderReducer, {
    isActive: false,
  });

  return (
    <NavigateLoaderContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigateLoaderContext.Provider>
  );
};
