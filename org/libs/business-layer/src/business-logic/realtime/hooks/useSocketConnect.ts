'use client';
import * as signalR from '@microsoft/signalr';
import { MSG_KEYS, baseSocketUrl } from '../config';
import { useRealtimeContext } from '../context';
import { HubConnection } from '@microsoft/signalr';

export function useSocketConnect() {
  const { dispatch } = useRealtimeContext();

  const handleConnect = (email?: string): Promise<HubConnection> => {
    return new Promise((rs, rj) => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${baseSocketUrl}${email ? `?email=${email}` : ''}`)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      if (connection) {
        connection
          .start()
          .then((res) => {
            dispatch({
              type: 'SET_CONNECTION',
              payload: connection,
            });
            connection.on(MSG_KEYS.ON_RECEIVE_MESSAGE, (message) => {
              alert(message);
            });
            console.log('CONNECTED TO CHAT SOCKET');
            rs(connection);
          })
          .catch((error) => {
            console.log('CANNOT CONNECTED TO CHAT SOCKET');
            rs(error);
          });
      }
    });
  };

  return {
    handleConnect,
  };
}
