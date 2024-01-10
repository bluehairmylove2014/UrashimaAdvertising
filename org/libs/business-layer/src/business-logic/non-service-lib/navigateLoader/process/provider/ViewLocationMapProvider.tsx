import React from 'react';
import { ContextProvider } from './ContextProvider';

export type navigateLoaderProviderType = {
  children: React.ReactNode;
};
export const NavigateLoaderProvider: React.FC<navigateLoaderProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
