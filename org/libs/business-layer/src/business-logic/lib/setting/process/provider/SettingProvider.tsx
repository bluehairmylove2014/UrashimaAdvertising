import React from 'react';
import { ContextProvider } from './ContextProvider';

export type settingProviderType = {
  children: React.ReactNode;
};
export const SettingProvider: React.FC<settingProviderType> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};
