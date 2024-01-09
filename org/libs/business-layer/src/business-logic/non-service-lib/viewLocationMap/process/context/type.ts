export interface ViewLocationMapState {
  coord: number[];
  isActive: boolean;
}

export type ViewLocationMapAction =
  | {
      type: 'SET_COORD';
      payload: ViewLocationMapState['coord'];
    }
  | {
      type: 'SET_IS_ACTIVE';
      payload: ViewLocationMapState['isActive'];
    };

export type ViewLocationMapContextType = {
  state: ViewLocationMapState;
  dispatch: React.Dispatch<ViewLocationMapAction>;
};
