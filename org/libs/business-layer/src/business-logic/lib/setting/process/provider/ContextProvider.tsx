/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { SettingContext } from '../context/context';
import { settingReducer } from '../context/reducer';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(settingReducer, {
    locationTypes: null,
    adForms: null,
    adBoardTypes: null,
    reportTypes: null,
  });

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
};
