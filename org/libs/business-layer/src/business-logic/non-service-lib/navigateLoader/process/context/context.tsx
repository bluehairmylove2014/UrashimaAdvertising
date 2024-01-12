import React from 'react';
import { useContext } from 'react';
import { NavigateLoaderContextType } from './type';

export const NavigateLoaderContext =
  React.createContext<NavigateLoaderContextType>({
    state: {
      isActive: false,
    },
    dispatch: () => undefined,
  });

export const useNavigateLoaderContext = () => {
  const context = useContext(NavigateLoaderContext);
  if (context === undefined) {
    throw new Error(
      'useNavigateLoaderContext must be used within a NavigateLoaderProvider'
    );
  }
  return context;
};
