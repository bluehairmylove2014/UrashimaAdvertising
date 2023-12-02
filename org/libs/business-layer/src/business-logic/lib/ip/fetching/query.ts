import { useQuery } from '@tanstack/react-query';
import { QUERY_N_MUTATION_KEYS } from '@business-layer/business-logic/configs/constants';
import { mutationConfig } from '@business-layer/business-logic/configs';
import { IPService } from '@business-layer/services';

const ipService = new IPService();

export const useGetCurrentLocationQuery = () => {
  return useQuery({
    queryKey: [QUERY_N_MUTATION_KEYS.GET_IP_LOCATION],
    queryFn: () => ipService.getCurrentLocation(),
    retry: mutationConfig.USE_QUERY_RETRY,
  });
};
