// Import necessary modules and functions
import { IAdLocation } from '@business-layer/services/entities';
import { useGetAllOfficerAdsQuery } from '../../fetching/query';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { getAllOfficerAdsResponseType } from '@business-layer/services/lib/adsService';

type useFetchAllOfficerAdsReturnType = {
  data: IAdLocation[] | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<getAllOfficerAdsResponseType, Error>>;
};
export const useFetchAllOfficerAds = (): useFetchAllOfficerAdsReturnType => {
  const { data, refetch } = useGetAllOfficerAdsQuery();
  return { data, refetch };
};
