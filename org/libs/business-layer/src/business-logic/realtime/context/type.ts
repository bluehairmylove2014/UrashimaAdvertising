import { HubConnection } from '@microsoft/signalr';

export interface RealtimeState {
  socket: HubConnection | null;
}

export type RealtimeAction = {
  type: 'SET_SOCKET';
  payload: RealtimeState['socket'];
};

export type RealtimeContextType = {
  state: RealtimeState;
  dispatch: React.Dispatch<RealtimeAction>;
};
