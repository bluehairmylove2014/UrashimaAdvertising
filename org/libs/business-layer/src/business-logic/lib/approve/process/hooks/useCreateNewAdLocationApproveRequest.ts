// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useCreateNewAdLocationApproveRequestMutation } from '../../fetching/mutation';
import { adLocationApproveDataType } from '@business-layer/services';

type useCreateNewAdLocationApproveRequestReturnType = {
  onCreateNewAdLocationApproveRequest: (
    approveData: adLocationApproveDataType
  ) => Promise<string>;
  isLoading: boolean;
};
export const useCreateNewAdLocationApproveRequest =
  (): useCreateNewAdLocationApproveRequestReturnType => {
    const createNewAdLocationApproveRequestMutation =
      useCreateNewAdLocationApproveRequestMutation();

    const onCreateNewAdLocationApproveRequest = (
      approveData: adLocationApproveDataType
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        createNewAdLocationApproveRequestMutation
          .mutateAsync({ approveData, token: getToken() })
          .then((data) => {
            resolve(data.message);
          })
          .catch((error) => reject(error));
      });
    };

    return {
      onCreateNewAdLocationApproveRequest,
      isLoading: createNewAdLocationApproveRequestMutation.isPending,
    };
  };
