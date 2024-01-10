export interface NavigateLoaderState {
  isActive: boolean;
}

export type NavigateLoaderAction = {
  type: 'SET_IS_ACTIVE';
  payload: NavigateLoaderState['isActive'];
};

export type NavigateLoaderContextType = {
  state: NavigateLoaderState;
  dispatch: React.Dispatch<NavigateLoaderAction>;
};
