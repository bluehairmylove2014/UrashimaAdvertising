import React from 'react';
import { ContextProvider } from './ContextProvider';

export type viewLocationMapProviderType = {
  children: React.ReactNode;
};
export const ViewLocationMapProvider: React.FC<viewLocationMapProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
