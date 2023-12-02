export type reportResponseType = {
  message: string;
};
export type reportAdParamsType = {
  adsBoardID: number;
  adsPointID: number;
  reportType: string;
  name: string;
  email: string;
  phone: boolean;
  content: string;
  images: {
    image: string;
  }[];
};
export type reportLocationParamsType = {
  latitude: number;
  longitude: number;
  reportType: string;
  name: string;
  email: string;
  phone: boolean;
  content: string;
  images: {
    image: string;
  }[];
};
