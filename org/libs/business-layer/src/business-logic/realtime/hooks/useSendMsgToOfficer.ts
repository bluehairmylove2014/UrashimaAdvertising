'use client';
import { HubConnection } from '@microsoft/signalr';
import { MSG_KEYS } from '../config';
import { CONNECTION_STATE } from '../config/states';
import { useRealtimeContext } from '../context';
import { useSocketConnect } from './useSocketConnect';

export function useSendMsgToOfficer() {
  const { state } = useRealtimeContext();
  const { handleConnect } = useSocketConnect();

  const handleSendMessage = (
    connection: HubConnection,
    region: string,
    message: string
  ) => {
    connection
      .invoke(MSG_KEYS.TO_OFFICER, region, message)
      .catch(function (err) {
        return console.error(err.toString());
      });
  };

  const onSendMsg = (region: string, message: string) => {
    const connection = state.connection;
    if (
      !connection ||
      connection.state === CONNECTION_STATE.Disconnected ||
      connection.state === CONNECTION_STATE.Disconnecting
    ) {
      handleConnect()
        .then((cnt) => {
          handleSendMessage(cnt, region, message);
        })
        .catch((error) => {
          console.log('SOCKET CANNOT NOT CONNECT');
        });
    } else if (connection.state === CONNECTION_STATE.Connected) {
      handleSendMessage(connection, region, message);
    } else if (
      connection.state === CONNECTION_STATE.Connecting ||
      connection.state === CONNECTION_STATE.Reconnecting
    ) {
      setTimeout(() => {
        if (!(connection.state === CONNECTION_STATE.Connected)) {
          console.log('SOCKET CONNECT TIMEOUT!!!');
        }
      }, 1500);
    }
  };

  return {
    onSendMsg,
  };
}
