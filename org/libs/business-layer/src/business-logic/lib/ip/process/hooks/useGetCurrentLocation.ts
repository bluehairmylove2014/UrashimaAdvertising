// Import necessary modules and functions
import { useGetCurrentLocationQuery } from '../../fetching/query';
import { getCurrentLocationResponse } from '@business-layer/services';

type useGetCurrentLocationReturnType = {
  data: getCurrentLocationResponse | undefined;
};
export const useGetCurrentLocation = (): useGetCurrentLocationReturnType => {
  const { data } = useGetCurrentLocationQuery();
  return { data };
};
