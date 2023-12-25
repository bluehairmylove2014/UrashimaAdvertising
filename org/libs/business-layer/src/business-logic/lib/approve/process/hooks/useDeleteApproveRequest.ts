// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useDeleteApproveRequestMutation } from '../../fetching/mutation';
import { useHandleApprove } from './useHandleApprove';

type useDeleteApproveRequestReturnType = {
  onDeleteApproveRequest: (approveRequestId: number) => Promise<string>;
  isLoading: boolean;
};
export const useDeleteApproveRequest =
  (): useDeleteApproveRequestReturnType => {
    const deleteApproveRequestMutation = useDeleteApproveRequestMutation();
    const { deleteApproveById } = useHandleApprove();

    const onDeleteApproveRequest = (
      approveRequestId: number
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        deleteApproveRequestMutation
          .mutateAsync({ id: approveRequestId, token: getToken() })
          .then((data) => {
            deleteApproveById(approveRequestId);
            resolve(data.message);
          })
          .catch((error) => reject(error));
      });
    };

    return {
      onDeleteApproveRequest,
      isLoading: deleteApproveRequestMutation.isPending,
    };
  };
