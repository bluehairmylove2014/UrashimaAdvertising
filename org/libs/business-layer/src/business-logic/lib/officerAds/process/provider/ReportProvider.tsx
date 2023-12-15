import React from 'react';
import { ContextProvider } from './ContextProvider';

export type officerAdProviderType = {
  children: React.ReactNode;
};
export const OfficerAdProvider: React.FC<officerAdProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
