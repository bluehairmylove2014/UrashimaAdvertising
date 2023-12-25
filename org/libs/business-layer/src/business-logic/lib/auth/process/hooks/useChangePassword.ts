// Importing necessary modules and functions
import { changePasswordParamsType } from '@business-layer/services';
import { useChangePasswordMutation } from '../../fetching/mutation';

type useChangePasswordType = {
  onChangePassword: ({
    oldPassword,
    password,
  }: changePasswordParamsType) => Promise<string>;
  isLoading: boolean;
};
export const useChangePassword = (): useChangePasswordType => {
  const changePasswordMutation = useChangePasswordMutation();

  const onChangePassword = ({
    oldPassword,
    password,
  }: changePasswordParamsType): Promise<string> => {
    return new Promise((resolve, reject) => {
      changePasswordMutation
        .mutateAsync({ oldPassword, password })
        .then((response) => {
          resolve(response.message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    onChangePassword,
    isLoading: changePasswordMutation.isPending,
  };
};
