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

// Change password
export type messageResponseType = {
  message: string;
};
export type changePasswordParamsType = {
  data: {
    oldPassword: string;
    password: string;
  };
  token: string | null;
};
// Forgot password
export type forgotPasswordParamsType = {
  email: string;
};
export type verifyPasswordOtpParamsType = {
  email: string;
  otp: string;
};
export type resetPasswordParamsType = {
  email: string;
  password: string;
};
