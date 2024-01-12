// Import necessary modules and functions
import { useRemoveRegionMutation } from '../../fetching/mutation';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
type useRemoveRegionReturnType = {
  onRemoveRegion: (id: number) => Promise<string>;
  isLoading: boolean;
};
export const useRemoveRegion = (): useRemoveRegionReturnType => {
  const removeRegionsMutation = useRemoveRegionMutation();

  const onRemoveRegion = (id: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      removeRegionsMutation
        .mutateAsync({ id, token: getToken() })
        .then((data) => resolve(data.message))
        .catch((error) => reject(error));
    });
  };

  return {
    onRemoveRegion,
    isLoading: removeRegionsMutation.isPending,
  };
};
