import { useMutation } from '@tanstack/react-query';
import {
  AccountService,
  modifyAccountInfoParamsType,
  modifyAccountInfoResponseType,
} from '@business-layer/services';

const accountService = new AccountService();

export const useModifyAccountInfoMutation = () => {
  return useMutation<
    modifyAccountInfoResponseType,
    Error,
    modifyAccountInfoParamsType,
    unknown
  >({
    mutationFn: accountService.modifyAccountInfo,
  });
};
