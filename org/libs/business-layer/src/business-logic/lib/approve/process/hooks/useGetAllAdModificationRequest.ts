// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useGetAllAdModificationRequestQuery } from '../../fetching/query';
import { getAllAdModificationRequestResponseType } from '@business-layer/services';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

type useGetAllAdModificationRequestReturnType = {
  data: getAllAdModificationRequestResponseType | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<getAllAdModificationRequestResponseType, Error>
  >;
};
export const useGetAllAdModificationRequest =
  (): useGetAllAdModificationRequestReturnType => {
    const { data, refetch } = useGetAllAdModificationRequestQuery(getToken());
    return { data, refetch };
  };
