import { useMutation } from '@tanstack/react-query';
import {
  AdsService,
  getAdDetailResponseType,
} from '@business-layer/services/lib/adsService';

const adService = new AdsService();

export const useGetAdDetailMutation = () => {
  return useMutation<getAdDetailResponseType, Error, number, unknown>({
    mutationFn: adService.getAdDetail,
  });
};
