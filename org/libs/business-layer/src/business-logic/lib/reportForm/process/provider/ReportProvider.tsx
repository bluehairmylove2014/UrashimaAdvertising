import React from 'react';
import { ContextProvider } from './ContextProvider';

export type reportFormProviderType = {
  children: React.ReactNode;
};
export const ReportFormProvider: React.FC<reportFormProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
