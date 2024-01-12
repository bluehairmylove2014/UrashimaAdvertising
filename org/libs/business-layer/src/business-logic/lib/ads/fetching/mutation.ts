import { useMutation } from '@tanstack/react-query';
import {
  AdsService,
  getAdDetailResponseType,
  hqCreateNewAdsParamsType,
  hqCreateNewAdsResponseType,
} from '@business-layer/services';

const adService = new AdsService();

export const useGetAdDetailMutation = () => {
  return useMutation<getAdDetailResponseType, Error, number, unknown>({
    mutationFn: adService.getAdDetail,
  });
};
export const useHQCreateNewAdMutation = () => {
  return useMutation<
    hqCreateNewAdsResponseType,
    Error,
    hqCreateNewAdsParamsType,
    unknown
  >({
    mutationFn: adService.hqCreateNewAds,
  });
};
