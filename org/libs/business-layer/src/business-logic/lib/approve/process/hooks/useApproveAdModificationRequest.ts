// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useApproveAdModificationRequestMutation } from '../../fetching/mutation';
import { approveAdModificationRequestParamsType } from '@business-layer/services';

type useApproveAdModificationRequestReturnType = {
  onApproveAdModificationRequest: (
    data: approveAdModificationRequestParamsType
  ) => Promise<string>;
  isLoading: boolean;
};
export const useApproveAdModificationRequest =
  (): useApproveAdModificationRequestReturnType => {
    const approveAdModificationRequestMutation =
      useApproveAdModificationRequestMutation();

    const onApproveAdModificationRequest = (
      data: approveAdModificationRequestParamsType
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        approveAdModificationRequestMutation
          .mutateAsync({ data, token: getToken() })
          .then((data) => {
            resolve(data.message);
          })
          .catch((error) => reject(error));
      });
    };

    return {
      onApproveAdModificationRequest,
      isLoading: approveAdModificationRequestMutation.isPending,
    };
  };
