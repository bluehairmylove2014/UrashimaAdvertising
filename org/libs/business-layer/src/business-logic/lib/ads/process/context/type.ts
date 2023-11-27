import { IAds } from '@business-layer/services/entities';

export interface AdsState {
  adsData: IAds[] | undefined;
}

export type AdsAction = {
  type: 'SET_ADS_ACTION';
  payload: AdsState['adsData'];
};

export type AdsContextType = {
  state: AdsState;
  dispatch: React.Dispatch<AdsAction>;
};
