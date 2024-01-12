// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useGetAllCreationRequestQuery } from '../../fetching/query';
import { getApproveListResponseType } from '@business-layer/services';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

type useGetAllCreationRequestReturnType = {
  data: getApproveListResponseType | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<getApproveListResponseType, Error>>;
};
export const useGetAllCreationRequest =
  (): useGetAllCreationRequestReturnType => {
    const { data, refetch } = useGetAllCreationRequestQuery(getToken());
    return { data, refetch };
  };
