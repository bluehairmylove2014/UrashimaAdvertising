import { useMutation } from '@tanstack/react-query';
import { AdsService, getAdDetailResponseType } from '@business-layer/services';

const adService = new AdsService();

export const useGetAdDetailMutation = () => {
  return useMutation<getAdDetailResponseType, Error, number, unknown>({
    mutationFn: adService.getAdDetail,
  });
};
