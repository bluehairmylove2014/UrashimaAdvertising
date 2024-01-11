import { Socket } from 'socket.io-client';

export interface RealtimeState {
  socket: Socket | null;
}

export type RealtimeAction = {
  type: 'SET_SOCKET';
  payload: RealtimeState['socket'];
};

export type RealtimeContextType = {
  state: RealtimeState;
  dispatch: React.Dispatch<RealtimeAction>;
};
