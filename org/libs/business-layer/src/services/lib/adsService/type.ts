import { IAdLocation, IAdLocationDetail } from '../../entities';

export type getAllAdsResponseType = IAdLocation[];
export type getAdDetailParamsType = {
  adId: number;
  token: string | null;
};
export type getAdDetailResponseType = IAdLocationDetail;

export type getAllOfficerAdsResponseType = IAdLocation[];
export type getOfficerLocationDetailAdsResponseType = IAdLocationDetail;

export type modificationDataType = IAdLocationDetail & {
  reasons: string;
};
export type adsPointModificationParamsType = {
  modificationData: modificationDataType;
  token: string;
};
export type adsPointModificationResponseType = {
  message: string;
};
