import React from 'react';
import { useContext } from 'react';
import { ViewLocationMapContextType } from './type';

export const ViewLocationMapContext =
  React.createContext<ViewLocationMapContextType>({
    state: {
      coord: [10.762538, 106.682448],
      isActive: false,
    },
    dispatch: () => undefined,
  });

export const useViewLocationMapContext = () => {
  const context = useContext(ViewLocationMapContext);
  if (context === undefined) {
    throw new Error(
      'useViewLocationMapContext must be used within a ViewLocationMapProvider'
    );
  }
  return context;
};
