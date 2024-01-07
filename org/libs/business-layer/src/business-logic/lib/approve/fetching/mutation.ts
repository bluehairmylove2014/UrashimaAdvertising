import { useMutation } from '@tanstack/react-query';
import {
  ApproveService,
  approveAdCreationRequestParamsType,
  approveAdCreationRequestResponseType,
  approveAdModificationRequestParamsType,
  approveAdModificationRequestResponseType,
  createNewAdBoardApproveRequestParamsType,
  createNewApproveRequestResponseType,
  deleteApproveRequestParamsType,
  deleteApproveRequestResponseType,
} from '@business-layer/services';

const approveService = new ApproveService();

export const useCreateNewAdBoardApproveRequestMutation = () => {
  return useMutation<
    createNewApproveRequestResponseType,
    Error,
    createNewAdBoardApproveRequestParamsType,
    unknown
  >({
    mutationFn: approveService.requestAdBoardApprove,
  });
};
export const useDeleteApproveRequestMutation = () => {
  return useMutation<
    deleteApproveRequestResponseType,
    Error,
    deleteApproveRequestParamsType,
    unknown
  >({
    mutationFn: approveService.deleteApproveRequest,
  });
};
export const useApproveAdModificationRequestMutation = () => {
  return useMutation<
    approveAdModificationRequestResponseType,
    Error,
    {
      data: approveAdModificationRequestParamsType;
      token: string | null;
    },
    unknown
  >({
    mutationFn: approveService.approveAdModificationRequest,
  });
};
export const useApproveAdCreationRequestMutation = () => {
  return useMutation<
    approveAdCreationRequestResponseType,
    Error,
    {
      data: approveAdCreationRequestParamsType;
      token: string | null;
    },
    unknown
  >({
    mutationFn: approveService.approveAdCreationRequest,
  });
};
