// Import necessary modules and functions
import { IAdsDetail } from '@business-layer/services/entities';
import { useGetAdDetailMutation } from '../../fetching/mutation';

type useGetAdDetailReturnType = {
  onGetAdDetail: (id: number) => Promise<IAdsDetail>;
  isLoading: boolean;
};
export const useGetAdDetail = (): useGetAdDetailReturnType => {
  const getAdDetailMutation = useGetAdDetailMutation();

  const onGetAdDetail = (id: number): Promise<IAdsDetail> => {
    return new Promise((resolve, reject) => {
      getAdDetailMutation
        .mutateAsync(id)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  return {
    onGetAdDetail,
    isLoading: getAdDetailMutation.isPending,
  };
};
