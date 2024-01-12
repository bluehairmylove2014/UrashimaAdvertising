import {
  RegionService,
  addRegionParamsType,
  addRegionResponseType,
} from '@business-layer/services';
import { useMutation } from '@tanstack/react-query';

const regionService = new RegionService();

export const useAddRegionMutation = () => {
  return useMutation<
    addRegionResponseType,
    Error,
    addRegionParamsType,
    unknown
  >({
    mutationFn: regionService.addRegions,
  });
};
export const useRemoveRegionMutation = () => {
  return useMutation<
    addRegionResponseType,
    Error,
    { id: number; token: string | null },
    unknown
  >({
    mutationFn: regionService.removeRegions,
  });
};
