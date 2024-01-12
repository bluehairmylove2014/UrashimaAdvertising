import { IAdLocation, IAdsBoard } from './ads';

export interface IApproveBase {
  id: number;
  adsPointId: number;
  adsContent: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  contractStart: string;
  contractEnd: string;
}

export interface IApprove extends IApproveBase {
  requestStatus: string;
  adsBoard: IAdsBoard | null;
  adsPoint: IAdLocation;
}
