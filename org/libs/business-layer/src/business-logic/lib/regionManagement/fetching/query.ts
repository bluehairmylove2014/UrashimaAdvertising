import { useQuery } from '@tanstack/react-query';
import { RegionService } from '@business-layer/services';
import { QUERY_N_MUTATION_KEYS } from '@business-layer/business-logic/configs/constants';
import { mutationConfig } from '@business-layer/business-logic/configs';

const regionService = new RegionService();

export const useFetchRegionsQuery = (token: string | null) => {
  return useQuery({
    queryKey: [QUERY_N_MUTATION_KEYS.GET_REGIONS, token],
    queryFn: () => regionService.getRegions(token),
    retry: mutationConfig.USE_QUERY_RETRY,
  });
};
