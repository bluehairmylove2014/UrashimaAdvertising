import {
  IAdLocation,
  IAdLocationDetail,
} from '@business-layer/services/entities';

export interface OfficerAdState {
  adLocationFilterCriteria: {
    searchKey: string | null;
    adsForm: string | null;
    locationType: string | null;
  };
  backupAdLocation: IAdLocation[] | null;
  adLocations: IAdLocation[] | null;
  adLocationsDetail: IAdLocationDetail[] | null;
}

export type OfficerAdAction =
  | {
      type: 'SET_AD_LOCATIONS';
      payload: OfficerAdState['adLocations'];
    }
  | {
      type: 'SET_SEARCH_KEY_FILTER_AD_LOCATION';
      payload: string | null;
    }
  | {
      type: 'SET_ADS_FORM_FILTER_AD_LOCATION';
      payload: string | null;
    }
  | {
      type: 'SET_LOCATION_TYPE_FILTER_AD_LOCATION';
      payload: string | null;
    }
  | {
      type: 'SET_AD_LOCATIONS_DETAIL';
      payload: OfficerAdState['adLocationsDetail'];
    };

export type OfficerAdContextType = {
  state: OfficerAdState;
  dispatch: React.Dispatch<OfficerAdAction>;
};
