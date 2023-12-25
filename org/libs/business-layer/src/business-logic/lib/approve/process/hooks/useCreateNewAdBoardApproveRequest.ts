// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useCreateNewAdBoardApproveRequestMutation } from '../../fetching/mutation';
import { adBoardApproveDataType } from '@business-layer/services';

type useCreateNewAdBoardApproveRequestReturnType = {
  onCreateNewAdBoardApproveRequest: (
    approveData: adBoardApproveDataType
  ) => Promise<string>;
  isLoading: boolean;
};
export const useCreateNewAdBoardApproveRequest =
  (): useCreateNewAdBoardApproveRequestReturnType => {
    const createNewAdBoardApproveRequestMutation =
      useCreateNewAdBoardApproveRequestMutation();

    const onCreateNewAdBoardApproveRequest = (
      approveData: adBoardApproveDataType
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        createNewAdBoardApproveRequestMutation
          .mutateAsync({ approveData, token: getToken() })
          .then((data) => {
            resolve(data.message);
          })
          .catch((error) => reject(error));
      });
    };

    return {
      onCreateNewAdBoardApproveRequest,
      isLoading: createNewAdBoardApproveRequestMutation.isPending,
    };
  };
