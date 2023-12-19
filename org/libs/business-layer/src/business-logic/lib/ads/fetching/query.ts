import { useQuery } from '@tanstack/react-query';
import { AdsService } from '@business-layer/services';
import { QUERY_N_MUTATION_KEYS } from '@business-layer/business-logic/configs/constants';
import { mutationConfig } from '@business-layer/business-logic/configs';

const adsService = new AdsService();

export const useGetAllAdsQuery = () => {
  return useQuery({
    queryKey: [QUERY_N_MUTATION_KEYS.GET_ALL_ADS],
    queryFn: () => adsService.getAllAds(),
    retry: mutationConfig.USE_QUERY_RETRY,
  });
};
