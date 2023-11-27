/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';
import { AdsContext } from '../context/adsContext';
import { adsReducer } from '../context/reducer';
import { useFetchAllAds } from '../hooks';

type ContextProviderType = {
  children: React.ReactNode;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(adsReducer, {
    adsData: undefined,
  });
  const { data } = useFetchAllAds();

  useEffect(() => {
    if (Array.isArray(data)) {
      dispatch({
        type: 'SET_ADS_ACTION',
        payload: data,
      });
    }
  }, [data]);

  return (
    <AdsContext.Provider value={{ state, dispatch }}>
      {children}
    </AdsContext.Provider>
  );
};
