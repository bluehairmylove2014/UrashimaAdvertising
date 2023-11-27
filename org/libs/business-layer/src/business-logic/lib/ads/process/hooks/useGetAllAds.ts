// Import necessary modules and functions
import { IAds } from '@business-layer/services/entities';
import { useAdsContext } from '../context';

type useGetAllAdsReturnType = IAds[] | undefined;
export const useGetAllAds = (): useGetAllAdsReturnType => {
  const { state } = useAdsContext();
  return state.adsData;
};
