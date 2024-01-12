import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useGetAllOfficerAdBoardQuery } from '../../fetching/query';
import { IAdsBoard } from '@business-layer/services/entities';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { getAllAdBoardsResponseType } from '@business-layer/services';

type useFetchAllOfficerAdBoardType = {
  data: any[] | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<getAllAdBoardsResponseType, Error>>;
};
export const useFetchAllOfficerAdBoard = (): useFetchAllOfficerAdBoardType => {
  const { data, refetch } = useGetAllOfficerAdBoardQuery(getToken());
  return { data, refetch };
};
