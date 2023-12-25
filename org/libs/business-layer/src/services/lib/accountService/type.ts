import { IAccountDetail } from '../../entities';

export type getAccountInfoResponseType = IAccountDetail;

export type accountInfoToModifyType = Pick<
  IAccountDetail,
  'fullName' | 'email' | 'dateOfBirth' | 'phone'
>;
export type modifyAccountInfoParamsType = {
  data: accountInfoToModifyType;
  token: string | null;
};
export type modifyAccountInfoResponseType = { message: string };
