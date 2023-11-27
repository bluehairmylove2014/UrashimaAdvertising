import React from 'react';
import { ContextProvider } from './ContextProvider';

export type AdsProviderType = {
  children: React.ReactNode;
};
export const AdsProvider: React.FC<AdsProviderType> = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};
