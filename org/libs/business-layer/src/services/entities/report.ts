interface IReport {
  reportType: string;
  name: string;
  email: string;
  phone: boolean;
  content: string;
  images: {
    image: string;
  }[];
}

export interface IAdReport extends IReport {
  adsBoardID: number;
  adsPointID: number;
}
export interface ILocationReport extends IReport {
  latitude: number;
  longitude: number;
}
