import { ProductService, UserService } from '@modules/services';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';

const userService = new UserService();

export const useGetUserQuery = (token: string | null) => {
  return useQuery([QUERY_KEYS.GET_USER, token], () =>
    userService.getUser(token)
  );
};
