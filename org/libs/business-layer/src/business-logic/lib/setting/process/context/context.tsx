import React from 'react';
import { useContext } from 'react';
import { SettingContextType } from './type';

export const SettingContext = React.createContext<SettingContextType>({
  state: {
    locationTypes: null,
    adForms: null,
    adBoardTypes: null,
    reportTypes: null,
  },
  dispatch: () => undefined,
});

export const useSettingContext = () => {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error('useSettingContext must be used within a SettingProvider');
  }
  return context;
};
