import { useMutation } from '@tanstack/react-query';
import {
  GeocodeService,
  getLocationDetailParamsType,
  getLocationDetailResponseType,
} from '@business-layer/services';

const geoService = new GeocodeService();

export const useGetLocationDetailMutation = () => {
  return useMutation<
    getLocationDetailResponseType,
    Error,
    getLocationDetailParamsType,
    unknown
  >({
    mutationFn: geoService.getLocationDetail,
  });
};
