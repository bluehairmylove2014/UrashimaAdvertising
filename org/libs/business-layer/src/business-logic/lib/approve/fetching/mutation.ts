import { useMutation } from '@tanstack/react-query';
import {
  ApproveService,
  createNewAdBoardApproveRequestParamsType,
  createNewAdLocationApproveRequestParamsType,
  createNewApproveRequestResponseType,
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
export const useCreateNewAdLocationApproveRequestMutation = () => {
  return useMutation<
    createNewApproveRequestResponseType,
    Error,
    createNewAdLocationApproveRequestParamsType,
    unknown
  >({
    mutationFn: approveService.requestAdLocationApprove,
  });
};
