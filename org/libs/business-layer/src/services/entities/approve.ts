import { IAdLocation, IAdsBoard } from './ads';

export interface IApprove {
  id: number;
  adsPointId: string;
  adsContent: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  contractStart: string;
  contractEnd: string;
  requestStatus: string;
  adsBoard?: IAdsBoard[] | undefined | null;
  adsPoint?: IAdLocation;
  RequestAddress: string;
}
