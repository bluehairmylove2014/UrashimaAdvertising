export type regionsType = string[] | null;
export interface RegionManagementState {
  regions: regionsType;
}

export type RegionManagementAction = {
  type: 'SET_REGIONS';
  payload: RegionManagementState['regions'];
};

export type RegionManagementContextType = {
  state: RegionManagementState;
  dispatch: React.Dispatch<RegionManagementAction>;
};
