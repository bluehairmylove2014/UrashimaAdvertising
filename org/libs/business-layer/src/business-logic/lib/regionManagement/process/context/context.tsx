import React from 'react';
import { useContext } from 'react';
import { RegionManagementContextType } from './type';

export const RegionManagementContext =
  React.createContext<RegionManagementContextType>({
    state: {
      regions: null,
    },
    dispatch: () => undefined,
  });

export const useRegionManagementContext = () => {
  const context = useContext(RegionManagementContext);
  if (context === undefined) {
    throw new Error(
      'useRegionManagementContext must be used within a RegionManagementProvider'
    );
  }
  return context;
};
