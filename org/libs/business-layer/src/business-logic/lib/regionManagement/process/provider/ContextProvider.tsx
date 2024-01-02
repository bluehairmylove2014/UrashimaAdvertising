/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';
import { RegionManagementContext } from '../context/context';
import { regionManagementReducer } from '../context/reducer';
import {
  getRegionsFromCookie,
  setRegionsToCookie,
} from '../helpers/regionsCookie';
import { useFetchRegions } from '../hooks';

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
  const { data: regionsFetchData } = useFetchRegions();

  useEffect(() => {
    if (regionsFetchData) {
      const regionsFormatData = regionsFetchData.map(
        (region) => `${region.ward}, ${region.district}`
      );
      dispatch({
        type: 'SET_REGIONS',
        payload: regionsFormatData,
      });
      setRegionsToCookie(regionsFormatData);
    }
  }, [regionsFetchData]);

  return (
    <RegionManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </RegionManagementContext.Provider>
  );
};
