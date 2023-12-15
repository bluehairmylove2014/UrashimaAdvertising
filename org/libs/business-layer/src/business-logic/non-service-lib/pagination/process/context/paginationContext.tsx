import React from 'react';
import { useContext } from 'react';
import { PaginationContextType } from './type';

export const PaginationContext = React.createContext<PaginationContextType>({
  state: {
    version: [],
  },
  dispatch: () => undefined,
});

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      'usePaginationContext must be used within a PaginationProvider'
    );
  }
  return context;
};
