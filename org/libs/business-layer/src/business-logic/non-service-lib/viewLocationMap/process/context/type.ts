export interface ViewLocationMapState {
  coord: number[];
  isActive: boolean;
  isSelectingLocation: boolean;
}

export type ViewLocationMapAction =
  | {
      type: 'SET_COORD';
      payload: ViewLocationMapState['coord'];
    }
  | {
      type: 'SET_IS_ACTIVE';
      payload: ViewLocationMapState['isActive'];
    }
  | {
      type: 'SET_IS_SELECTING';
      payload: ViewLocationMapState['isSelectingLocation'];
    };

export type ViewLocationMapContextType = {
  state: ViewLocationMapState;
  dispatch: React.Dispatch<ViewLocationMapAction>;
};
