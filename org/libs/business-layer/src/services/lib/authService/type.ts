import { IAccount } from '../../entities';

export type tokenType = string;
export type registerParamsType = Pick<
  IAccount,
  'email' | 'fullName' | 'password'
>;
export type loginParamsType = Pick<IAccount, 'email' | 'password'>;

export type authenticationResponseType = {
  message: string;
  token: tokenType;
  refreshToken: tokenType;
};
export type refreshTokenResponseType = {
  message: string;
  token: tokenType;
};
