// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useGetAllAdModificationRequestQuery } from '../../fetching/query';
import { getAllAdModificationRequestResponseType } from '@business-layer/services';

type useGetAllAdModificationRequestReturnType =
  | getAllAdModificationRequestResponseType
  | undefined;
export const useGetAllAdModificationRequest =
  (): useGetAllAdModificationRequestReturnType => {
    const { data } = useGetAllAdModificationRequestQuery(getToken());
    return data;
  };
