/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';
import { RegionManagementContext } from '../context/context';
import { regionManagementReducer } from '../context/reducer';
import {
  getRegionsFromCookie,
  setRegionsToCookie,
} from '../helpers/regionsCookie';
import { RegionService } from '@business-layer/services';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';

const regionService = new RegionService();
async function getRegions() {
  try {
    const token = getToken();
    if (token) {
      return await regionService.getRegions(token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

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

  useEffect(() => {
    getRegions().then((regionData) => {
      if (regionData) {
        const regionsArr = regionData.map((r) => `${r.ward}, ${r.district}`);
        dispatch({
          type: 'SET_REGIONS',
          payload: regionsArr,
        });
        setRegionsToCookie(regionsArr);
      }
    });
  }, []);

  return (
    <RegionManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </RegionManagementContext.Provider>
  );
};
