// Import necessary modules and functions
import { IUser } from '@modules/services/entities';
import { useUserContext } from '../context';

type useGetUserType = IUser | undefined;
export const useGetUser = (): useGetUserType => {
  const { state } = useUserContext();
  return state.userData;
};
