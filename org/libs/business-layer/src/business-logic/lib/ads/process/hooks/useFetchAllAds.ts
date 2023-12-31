// Import necessary modules and functions
import { IAdLocation } from '@business-layer/services/entities';
import { useGetAllAdsQuery } from '../../fetching/query';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { getAllAdsResponseType } from '@business-layer/services/lib/adsService';

type useFetchAllAdsReturnType = {
  data: IAdLocation[] | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<getAllAdsResponseType, Error>>;
};
export const useFetchAllAds = (): useFetchAllAdsReturnType => {
  const { data, refetch } = useGetAllAdsQuery();
  return { data, refetch };
};
