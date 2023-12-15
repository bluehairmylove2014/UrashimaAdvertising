import {
  AdsService,
  getOfficerLocationDetailAdsResponseType,
} from '@business-layer/services';
import { useMutation } from '@tanstack/react-query';

const adService = new AdsService();

export const useGetOfficerAdDetailMutation = () => {
  return useMutation<
    getOfficerLocationDetailAdsResponseType,
    Error,
    number,
    unknown
  >({
    mutationFn: adService.getOfficerLocationDetail,
  });
};
