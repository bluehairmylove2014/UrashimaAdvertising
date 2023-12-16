/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';
import { OfficerAdContext } from '../context/context';
import { officerAdReducer } from '../context/reducer';
import { useFetchAllOfficerAds } from '../hooks';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(officerAdReducer, {
    adLocationFilterCriteria: {
      searchKey: null,
      adsForm: null,
      locationType: null,
    },
    backupAdLocation: null,
    adLocations: null,
    adLocationsDetail: null,
  });
  const { data: officerAdData } = useFetchAllOfficerAds();

  useEffect(() => {
    if (officerAdData) {
      dispatch({
        type: 'SET_AD_LOCATIONS',
        payload: officerAdData,
      });
    }
  }, [officerAdData]);

  return (
    <OfficerAdContext.Provider value={{ state, dispatch }}>
      {children}
    </OfficerAdContext.Provider>
  );
};
