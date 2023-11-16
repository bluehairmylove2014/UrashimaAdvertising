export interface IUser {
  userId: number;
  email: string;
  avatar: string;
  fullName: string;
  phoneNumber: string;
  isSocial: boolean;
  userCreatedAt: string;
  rankId: 4;
  rankName: string;
  rankCreatedAt: string;
  addressId: 4;
  country: string | null;
  province: string | null;
  district: string | null;
  ward: string | null;
  streetAddress: string | null;
}
