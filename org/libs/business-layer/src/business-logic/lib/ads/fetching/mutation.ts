import { useMutation } from '@tanstack/react-query';
import { AdsService, getAdDetailResponseType, getOfficerLocationDetailAdsResponseType } from '@business-layer/services';

const adService = new AdsService();

export const useGetAdDetailMutation = () => {
  return useMutation<getAdDetailResponseType, Error, number, unknown>({
    mutationFn: adService.getAdDetail,
  });
};
export const useGetOfficerAdDetailMutation = () => {
  return useMutation<getOfficerLocationDetailAdsResponseType, Error, number, unknown>({
    mutationFn: adService.getOfficerLocationDetail,
  });
};
