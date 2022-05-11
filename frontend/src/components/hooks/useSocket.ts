import { SocketContext } from './../SocketProvider';
import { useContext } from 'react';

//TODO socket이 없을 때, 연결이 끊겼을 때 예외처리
export const useSocket = () => {
  return useContext(SocketContext);
};
