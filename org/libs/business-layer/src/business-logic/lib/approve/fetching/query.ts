import { useQuery } from '@tanstack/react-query';
import { ApproveService } from '@business-layer/services';
import { QUERY_N_MUTATION_KEYS } from '@business-layer/business-logic/configs/constants';
import { mutationConfig } from '@business-layer/business-logic/configs';

const service = new ApproveService();

export const useGetAllCreationRequestQuery = (token: string | null) => {
  return useQuery({
    queryKey: [QUERY_N_MUTATION_KEYS.GET_ALL_AD_CREATION_REQUESTS],
    queryFn: () => service.getApproveList(token),
    retry: mutationConfig.USE_QUERY_RETRY,
  });
};

export const useGetAllAdModificationRequestQuery = (token: string | null) => {
  return useQuery({
    queryKey: [QUERY_N_MUTATION_KEYS.GET_ALL_AD_MODIFICATION_REQUESTS],
    queryFn: () => service.getAllAdModificationRequest(token),
    retry: mutationConfig.USE_QUERY_RETRY,
  });
};
