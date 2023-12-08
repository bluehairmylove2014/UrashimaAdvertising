import { ILocation } from '@business-layer/services/entities/location';

export type getLocationDetailParamsType = {
  latitude: number;
  longitude: number;
};
export type getLocationDetailResponseType = ILocation;
