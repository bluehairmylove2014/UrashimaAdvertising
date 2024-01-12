// Import necessary modules and functions
import { IAdLocationDetail } from '@business-layer/services/entities';
import { useHQCreateNewAdMutation } from '../../fetching/mutation';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';

type useCreateNewAdReturnType = {
  onCreateNewAd: (data: Omit<IAdLocationDetail, 'id'>) => Promise<string>;
  isLoading: boolean;
};
export const useCreateNewAd = (): useCreateNewAdReturnType => {
  const hqCreateNewAdMutation = useHQCreateNewAdMutation();

  const onCreateNewAd = (
    data: Omit<IAdLocationDetail, 'id'>
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      hqCreateNewAdMutation
        .mutateAsync({ data, token: getToken() })
        .then((res) => resolve(res.message))
        .catch((error) => reject(error));
    });
  };

  return {
    onCreateNewAd,
    isLoading: hqCreateNewAdMutation.isPending,
  };
};
