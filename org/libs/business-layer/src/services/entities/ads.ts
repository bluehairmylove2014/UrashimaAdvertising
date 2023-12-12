export interface IAdLocation {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  locationType: string; // "Đất công/Công viên/Hành lang an toàn giao thông" or "Đất tư nhân/Nhà ở riêng lẻ" or "Trung tâm thương mại" or "Chợ" or "Cây xăng" or "Nhà chờ xe buýt"
  adsForm: string; // 'Cổ động chính trị' or 'Quảng cáo thương mại' or 'Xã hội hoá'
  planned: boolean;
}

export interface IAdsBoard {
  id: number;
  adsPointId: number;
  adsType: string;
  height: number;
  width: number;
  image: string;
  expiredDate: string;
}
export interface IAdLocationDetail extends IAdLocation {
  images: {
    image: string;
  }[];
  adsBoard: IAdsBoard[];
}
