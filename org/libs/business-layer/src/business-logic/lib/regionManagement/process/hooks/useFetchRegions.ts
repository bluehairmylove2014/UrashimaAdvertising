// Import necessary modules and functions
import { useFetchRegionsQuery } from '../../fetching/query';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { regionResponseType } from '@business-layer/services';

type useFetchRegionsReturnType = {
  data: regionResponseType | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<regionResponseType, Error>>;
};
export const useFetchRegions = (): useFetchRegionsReturnType => {
  const { data, refetch } = useFetchRegionsQuery(getToken());
  return { data, refetch };
};
