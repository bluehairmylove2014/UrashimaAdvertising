// Import necessary modules and functions
import { AxiosError, getUserResponse } from '@modules/services';
import { useFetchUserMutation } from '../../fetching/mutation';
import { useUserContext } from '../context';

type useFetchUserReturnType = {
  onFetchUser: (token?: string) => Promise<getUserResponse>;
};
export const useFetchUser = (): useFetchUserReturnType => {
  const { state } = useUserContext();
  const { dispatch } = useUserContext();
  const fetchUserMutation = useFetchUserMutation();

  const onFetchUser = (token?: string): Promise<getUserResponse> => {
    return new Promise(
      (resolve, reject: (error: Error | AxiosError) => void) => {
        fetchUserMutation
          .mutateAsync(token || state.accessToken)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      }
    );
  };

  return {
    onFetchUser,
  };
};
