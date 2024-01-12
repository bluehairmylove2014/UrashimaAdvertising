import { IRegion } from '@business-layer/services/entities/region';

export type regionResponseType = IRegion[];

export type addRegionParamsType = {
  data: Omit<IRegion, 'id'>;
  token: string | null;
};
export type addRegionResponseType = {
  message: string;
};
