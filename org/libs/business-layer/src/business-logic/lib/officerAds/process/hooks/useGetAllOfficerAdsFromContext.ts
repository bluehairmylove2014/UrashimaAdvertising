// Import necessary modules and functions
import { IAdLocation } from '@business-layer/services/entities';
import { useOfficerAdContext } from '../context/context';
import { useMemo } from 'react';
import {
  fulltextLowercaseMatch,
  fulltextMatch,
} from '../helpers/fulltextSearch';

type useGetAllOfficerAdsFromContextReturnType = IAdLocation[] | null;
export const useGetAllOfficerAdsFromContext =
  (): useGetAllOfficerAdsFromContextReturnType => {
    const { state } = useOfficerAdContext();

    return useMemo(() => {
      if (state.adLocations && state.adLocations.length > 0) {
        let adLocationList = [...state.adLocations];
        const { searchKey, adsForm, locationType } =
          state.adLocationFilterCriteria;

        if (searchKey) {
          adLocationList = adLocationList.filter((l) =>
            fulltextLowercaseMatch(l.address, searchKey)
          );
        }
        if (adsForm) {
          adLocationList = adLocationList.filter((l) =>
            fulltextMatch(l.adsForm, adsForm)
          );
        }
        if (locationType) {
          adLocationList = adLocationList.filter((l) =>
            fulltextMatch(l.locationType, locationType)
          );
        }

        return adLocationList;
      } else {
        return state.adLocations;
      }
    }, [
      state.adLocations,
      state.adLocationFilterCriteria.adsForm,
      state.adLocationFilterCriteria.locationType,
      state.adLocationFilterCriteria.searchKey,
    ]);
  };
