import { useMutation } from '@tanstack/react-query';
import {
  ApproveService,
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
