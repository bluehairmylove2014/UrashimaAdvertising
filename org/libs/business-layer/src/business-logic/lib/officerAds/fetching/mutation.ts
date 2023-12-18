import {
  AdsService,
  adsPointModificationParamsType,
  adsPointModificationResponseType,
  getAdDetailParamsType,
  getOfficerLocationDetailAdsResponseType,
} from '@business-layer/services';
import { useMutation } from '@tanstack/react-query';

const adService = new AdsService();

export const useGetOfficerAdDetailMutation = () => {
  return useMutation<
    getOfficerLocationDetailAdsResponseType,
    Error,
    getAdDetailParamsType,
    unknown
  >({
    mutationFn: adService.getOfficerLocationDetail,
  });
};
export const useModifyAdLocationDetailMutation = () => {
  return useMutation<
    adsPointModificationResponseType,
    Error,
    adsPointModificationParamsType,
    unknown
  >({
    mutationFn: adService.adsPointModification,
  });
};
