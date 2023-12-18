// Import necessary modules and functions
import { useModifyAdLocationDetailMutation } from '../../fetching/mutation';
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { modificationDataType } from '@business-layer/services';
type useModifyAdLocationDetailReturnType = {
  onModifyAdLocationDetail: (data: modificationDataType) => Promise<string>;
  isLoading: boolean;
};
export const useModifyAdLocationDetail =
  (): useModifyAdLocationDetailReturnType => {
    const modifyAdLocationDetailMutation = useModifyAdLocationDetailMutation();

    const onModifyAdLocationDetail = (
      data: modificationDataType
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        const token = getToken();
        if (token) {
          modifyAdLocationDetailMutation
            .mutateAsync({ modificationData: data, token })
            .then((data) => resolve(data.message))
            .catch((error) => reject(error));
        } else {
          reject(new Error('Unauthorized'));
        }
      });
    };

    return {
      onModifyAdLocationDetail,
      isLoading: modifyAdLocationDetailMutation.isPending,
    };
  };
