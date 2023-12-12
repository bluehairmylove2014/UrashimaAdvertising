// Import necessary modules and functions
import { IAdsDetail } from '@business-layer/services/entities';
import { useGetOfficerAdDetailMutation } from '../../fetching/mutation';
type useGetOfficerAdDetailReturnType = {
  onGetOfficerAdDetail: (id: number) => Promise<IAdsDetail>;
  isLoading: boolean;
};
export const useGetOfficerAdDetail = (): useGetOfficerAdDetailReturnType => {
  const getLocationDetailMutation = useGetOfficerAdDetailMutation();

  const onGetOfficerAdDetail = (id: number): Promise<IAdsDetail> => {
    return new Promise((resolve, reject) => {
      getLocationDetailMutation
        .mutateAsync(id)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  return {
    onGetOfficerAdDetail,
    isLoading: getLocationDetailMutation.isPending,
  };
};
