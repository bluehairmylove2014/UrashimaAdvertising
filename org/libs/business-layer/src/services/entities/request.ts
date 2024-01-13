import { IAdsBoard } from './ads';

export interface IAdModificationRequest {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  locationType: string;
  adsForm: string;
  planned: boolean;
  images: { image: string }[];
  adsBoard: IAdsBoard[];
  adsPointId: number;
  modifyTime: string;
  requestStatus: string;
  reasons: string;
}
