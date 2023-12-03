import React from 'react';
import { ContextProvider } from './ContextProvider';

export type reportProviderType = {
  children: React.ReactNode;
};
export const ReportProvider: React.FC<reportProviderType> = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};
