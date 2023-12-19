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
  reportStatus: boolean; // false: Chưa xử lý, true: Đã xử lý
  response: string | null; // null: Chưa xử lý chưa có response, string ngược lại
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
