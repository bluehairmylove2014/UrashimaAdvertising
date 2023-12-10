import { IAdsDetail } from './ads';
import { IAdsBoard } from './adsBoard';

interface IReport {
  reportType: string;
  name: string;
  email: string;
  phone: boolean;
  content: string;
  images: {
    image: string;
  }[];
  reportData: IAdsDetail | IAdsBoard;
}

export interface IAdReport extends IReport {
  adsBoardID: number;
  adsPointID: number;
}
export interface ILocationReport extends IReport {
  latitude: number;
  longitude: number;
}
