import { IAdLocation, IAdLocationDetail, IAdsBoard } from './ads';

interface IReport {
  lat: number;
  lon: number;
  reportType: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  images: {
    image: string;
  }[];
  reportStatus: boolean; // false: Chưa xử lý, true: Đã xử lý
  treatmentProcess: string; // chuỗi rỗng: Chưa xử lý chưa có response, không thì ngược lại
  submissionDate: string; // Ngày tháng năm giờ phút giây
}

export interface IAdReport extends IReport {
  adsBoardID: number;
  adsPointID: number;
  reportData: IAdsBoard;
}
export interface ILocationReport extends IReport {
  latitude: number;
  longitude: number;
  reportData: IAdLocationDetail;
}

export interface IOfficerReport extends IReport {
  id: number;
  address: string;
}

export interface IOfficerReportDetail extends IOfficerReport {
  adsBoard?: IAdsBoard;

  adsPoint?: IAdLocation;

  location?: Pick<IAdLocation, 'id' | 'longitude' | 'latitude' | 'address'>;
}
