import {
  AuthService,
  authenticationResponseType,
  loginParamsType,
  refreshTokenResponseType,
  SocialService,
} from '@business-layer/services';
import { useMutation } from '@tanstack/react-query';
import { mutationConfig } from '@business-layer/business-logic/configs';
import {
  getFBAccessTokenParamsType,
  getFBAccessTokenResponseType,
  getGithubAccessTokenParamsType,
  getGithubAccessTokenResponseType,
  getGithubUserInfoResponseType,
  getUserInfoResponseType,
  updateAccountParamsType,
  updateAccountResponseType,
} from '@business-layer/services/lib/socialService/type';

// Initialize the AuthService
const authService = new AuthService();
const socialService = new SocialService();

/**
 * Use this mutation to login
 */
export const useLoginMutation = () => {
  return useMutation<
    authenticationResponseType,
    Error,
    loginParamsType,
    unknown
  >({
    mutationFn: authService.login,
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation<refreshTokenResponseType, Error, string, unknown>({
    mutationFn: authService.refreshToken,
    retry: mutationConfig.RETRY,
  });
};

export const useUpdateAccountMutation = () => {
  return useMutation<
    updateAccountResponseType,
    Error,
    updateAccountParamsType,
    unknown
  >({
    mutationFn: socialService.updateAccount,
    retry: mutationConfig.RETRY,
  });
};

export const useGetFBAccessTokenMutation = () => {
  return useMutation<
    getFBAccessTokenResponseType,
    Error,
    getFBAccessTokenParamsType,
    unknown
  >({
    mutationFn: socialService.getFBAccessToken,
    retry: mutationConfig.RETRY,
  });
};

export const useGetFBUserInfoMutation = () => {
  return useMutation<getUserInfoResponseType, Error, string, unknown>({
    mutationFn: socialService.getFBUserInfo,
    retry: mutationConfig.RETRY,
  });
};

export const useGetGithubAccessTokenMutation = () => {
  return useMutation<
    getGithubAccessTokenResponseType,
    Error,
    getGithubAccessTokenParamsType,
    unknown
  >({
    mutationFn: socialService.getGithubAccessToken,
    retry: mutationConfig.RETRY,
  });
};

export const useGetGithubUserInfoMutation = () => {
  return useMutation<getGithubUserInfoResponseType, Error, string, unknown>({
    mutationFn: socialService.getGithubUserInfo,
    retry: mutationConfig.RETRY,
  });
};
