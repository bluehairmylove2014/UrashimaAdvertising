import { IAdLocationDetail, IAdsBoard } from './ads';

interface IReport {
  reportType: string;
  name: string;
  email: string;
  phone: boolean;
  content: string;
  images: {
    image: string;
  }[];
  reportData: IAdLocationDetail | IAdsBoard;
}

export interface IAdReport extends IReport {
  adsBoardID: number;
  adsPointID: number;
}
export interface ILocationReport extends IReport {
  latitude: number;
  longitude: number;
}
