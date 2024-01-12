// Import necessary modules and functions
import { useAddRegionMutation } from '../../fetching/mutation';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { IRegion } from '@business-layer/services/entities/region';
type useAddRegionsReturnType = {
  onAddRegions: (data: Omit<IRegion, 'id'>) => Promise<string>;
  isLoading: boolean;
};
export const useAddRegions = (): useAddRegionsReturnType => {
  const addRegionsMutation = useAddRegionMutation();

  const onAddRegions = (data: Omit<IRegion, 'id'>): Promise<string> => {
    return new Promise((resolve, reject) => {
      addRegionsMutation
        .mutateAsync({ data, token: getToken() })
        .then((data) => resolve(data.message))
        .catch((error) => reject(error));
    });
  };

  return {
    onAddRegions,
    isLoading: addRegionsMutation.isPending,
  };
};
