// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useApproveAdCreationRequestMutation } from '../../fetching/mutation';
import { approveAdCreationRequestParamsType } from '@business-layer/services';

type useApproveAdCreationRequestReturnType = {
  onApproveAdCreationRequest: (
    data: approveAdCreationRequestParamsType
  ) => Promise<string>;
  isLoading: boolean;
};
export const useApproveAdCreationRequest =
  (): useApproveAdCreationRequestReturnType => {
    const approveAdCreationRequestMutation =
      useApproveAdCreationRequestMutation();

    const onApproveAdCreationRequest = (
      data: approveAdCreationRequestParamsType
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        approveAdCreationRequestMutation
          .mutateAsync({ data, token: getToken() })
          .then((data) => {
            resolve(data.message);
          })
          .catch((error) => reject(error));
      });
    };

    return {
      onApproveAdCreationRequest,
      isLoading: approveAdCreationRequestMutation.isPending,
    };
  };
