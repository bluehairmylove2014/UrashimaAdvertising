import React from 'react';
import { ContextProvider } from './ContextProvider';

export type approveProviderType = {
  children: React.ReactNode;
};
export const ApproveProvider: React.FC<approveProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
