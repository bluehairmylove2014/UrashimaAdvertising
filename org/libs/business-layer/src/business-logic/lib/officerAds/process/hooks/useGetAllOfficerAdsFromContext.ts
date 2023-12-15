// Import necessary modules and functions
import { IAdLocation } from '@business-layer/services/entities';
import { useOfficerAdContext } from '../context/context';
import { useMemo } from 'react';

type useGetAllOfficerAdsFromContextReturnType = IAdLocation[] | null;
export const useGetAllOfficerAdsFromContext =
  (): useGetAllOfficerAdsFromContextReturnType => {
    const { state } = useOfficerAdContext();
    return useMemo(() => state.adLocations, [state.adLocations]);
  };
