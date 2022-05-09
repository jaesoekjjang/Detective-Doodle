import { Socket } from 'socket.io-client';
import Game from './Game';
import System from './System';

export const initializeGame = (myInfo: any, socket: Socket, dispatchFn: any) => {
  console.log(socket);
  System.configure(socket, dispatchFn);
  const system = System.instance;
};
