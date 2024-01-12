// Import necessary modules and functions
import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useDeleteModificationRequestMutation } from '../../fetching/mutation';
import { useHandleApprove } from './useHandleApprove';

type useDeleteModificationRequestReturnType = {
  onDeleteModificationRequest: (approveRequestId: number) => Promise<string>;
  isLoading: boolean;
};
export const useDeleteModificationRequest =
  (): useDeleteModificationRequestReturnType => {
    const deleteApproveRequestMutation = useDeleteModificationRequestMutation();
    const { deleteApproveById } = useHandleApprove();

    const onDeleteModificationRequest = (
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
      onDeleteModificationRequest,
      isLoading: deleteApproveRequestMutation.isPending,
    };
  };
