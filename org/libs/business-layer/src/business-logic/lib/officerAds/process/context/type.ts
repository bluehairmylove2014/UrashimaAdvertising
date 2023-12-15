import {
  IAdLocation,
  IAdLocationDetail,
} from '@business-layer/services/entities';

export interface OfficerAdState {
  adLocations: IAdLocation[] | null;
  adLocationsDetail: IAdLocationDetail[] | null;
}

export type OfficerAdAction =
  | {
      type: 'SET_AD_LOCATIONS';
      payload: OfficerAdState['adLocations'];
    }
  | {
      type: 'SET_AD_LOCATIONS_DETAIL';
      payload: OfficerAdState['adLocationsDetail'];
    };

export type OfficerAdContextType = {
  state: OfficerAdState;
  dispatch: React.Dispatch<OfficerAdAction>;
};
