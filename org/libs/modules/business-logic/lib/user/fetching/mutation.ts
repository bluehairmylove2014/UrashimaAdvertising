import { UserService } from "../../../../services";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

const userService = new UserService();

export const useFetchUserMutation = () => {
  return useMutation(userService.getUser, {
    retry: mutationConfig.RETRY,
  });
};
