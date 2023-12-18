// Import necessary modules and functions
import { IAdLocationDetail } from '@business-layer/services/entities';
import { useGetOfficerAdDetailMutation } from '../../fetching/mutation';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
type useGetOfficerAdDetailReturnType = {
  onGetOfficerAdDetail: (id: number) => Promise<IAdLocationDetail>;
  isLoading: boolean;
};
export const useGetOfficerAdDetail = (): useGetOfficerAdDetailReturnType => {
  const getLocationDetailMutation = useGetOfficerAdDetailMutation();

  const onGetOfficerAdDetail = (id: number): Promise<IAdLocationDetail> => {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (token) {
        getLocationDetailMutation
          .mutateAsync({ adId: id, token })
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      } else {
        reject(new Error('Unauthorized'));
      }
    });
  };

  return {
    onGetOfficerAdDetail,
    isLoading: getLocationDetailMutation.isPending,
  };
};
