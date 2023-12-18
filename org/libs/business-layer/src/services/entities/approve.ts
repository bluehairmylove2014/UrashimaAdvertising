import { IAdsBoard } from "./ads";

export interface IAPPROVE {
  adsContent: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  contractStart: string;
  contractEnd: string;
  adsBoard: IAdsBoard[]
}