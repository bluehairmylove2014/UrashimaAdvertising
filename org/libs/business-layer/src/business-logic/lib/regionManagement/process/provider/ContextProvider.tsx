/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from 'react';
import { RegionManagementContext } from '../context/context';
import { regionManagementReducer } from '../context/reducer';
import { getRegionsFromCookie } from '../helpers/regionsCookie';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const regionsCookieFormat = getRegionsFromCookie();
  const [state, dispatch] = useReducer(regionManagementReducer, {
    regions: regionsCookieFormat ? regionsCookieFormat.split('|') : null,
  });

  return (
    <RegionManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </RegionManagementContext.Provider>
  );
};
