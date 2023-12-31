import React from 'react';
import { ContextProvider } from './ContextProvider';

export type regionManagementProviderType = {
  children: React.ReactNode;
};
export const RegionManagementProvider: React.FC<
  regionManagementProviderType
> = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};
