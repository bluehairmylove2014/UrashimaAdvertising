import { IAdLocation, IAdLocationDetail, IAdsBoard } from '../../entities';

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
export type getAllAdBoardsResponseType = IAdsBoard[];

export type hqCreateNewAdsParamsType = {
  data: Omit<IAdLocationDetail, 'id'>;
  token: string | null;
};
export type hqCreateNewAdsResponseType = {
  message: string;
};
