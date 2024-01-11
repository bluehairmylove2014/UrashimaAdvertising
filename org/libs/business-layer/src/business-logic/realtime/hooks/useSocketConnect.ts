import { Socket, connect } from 'socket.io-client';
import { MSG_KEYS, baseSocketUrl } from '../config';
import { useRealtimeContext } from '../context';

export function useSocketConnect() {
  const { dispatch } = useRealtimeContext();

  const handleConnect = (email?: string): Promise<Socket> => {
    return new Promise((rs, rj) => {
      // const socket = connect(
      //   `${baseSocketUrl}${email ? `?email=${email}` : ''}`
      // );
      // socket.on('connect', () => {
      //   console.log('Connected to server');
      //   dispatch({
      //     type: 'SET_SOCKET',
      //     payload: socket,
      //   });
      //   rs(socket);
      // });
      // socket.on(MSG_KEYS.ON_RECEIVE_MESSAGE, (data) => {
      //   console.log('Received message from server:', data);
      // });
      // socket.on('disconnect', () => {
      //   console.log('Disconnected from server');
      //   // You can handle disconnect scenarios here if needed
      // });
      // // Xử lý sự kiện lỗi
      // socket.on('error', (error) => {
      //   console.error('Socket connection error:', error);
      //   rj(error); // Reject promise with the error
      // });
    });
  };

  return {
    handleConnect,
  };
}
