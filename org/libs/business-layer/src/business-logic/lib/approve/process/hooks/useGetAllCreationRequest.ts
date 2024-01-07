// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useGetAllCreationRequestQuery } from '../../fetching/query';
import { getApproveListResponseType } from '@business-layer/services';

type useGetAllCreationRequestReturnType =
  | getApproveListResponseType
  | undefined;
export const useGetAllCreationRequest =
  (): useGetAllCreationRequestReturnType => {
    const { data } = useGetAllCreationRequestQuery(getToken());
    return data;
  };
