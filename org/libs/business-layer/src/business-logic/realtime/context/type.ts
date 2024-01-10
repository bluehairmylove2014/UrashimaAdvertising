export interface RealtimeState {
  connection: signalR.HubConnection | null;
}

export type RealtimeAction = {
  type: 'SET_CONNECTION';
  payload: RealtimeState['connection'];
};

export type RealtimeContextType = {
  state: RealtimeState;
  dispatch: React.Dispatch<RealtimeAction>;
};
