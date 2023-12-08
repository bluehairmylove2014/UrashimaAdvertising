// Import necessary modules and functions
import { ILocation } from '@business-layer/services/entities';
import { useGetLocationDetailMutation } from '../../fetching/mutation';
import { getLocationDetailParamsType } from '@business-layer/services';

type useGetLocationDetailReturnType = {
  onGetLocationDetail: ({
    latitude,
    longitude,
  }: getLocationDetailParamsType) => Promise<ILocation>;
  isLoading: boolean;
};
export const useGetLocationDetail = (): useGetLocationDetailReturnType => {
  const getLocationDetailMutation = useGetLocationDetailMutation();

  const onGetLocationDetail = ({
    latitude,
    longitude,
  }: getLocationDetailParamsType): Promise<ILocation> => {
    return new Promise((resolve, reject) => {
      getLocationDetailMutation
        .mutateAsync({ latitude, longitude })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  return {
    onGetLocationDetail,
    isLoading: getLocationDetailMutation.isPending,
  };
};
