import React, { createContext, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { myName } from '../recoil/myInfoAtom';
import { roomListAtom } from '../recoil/roomAtom';
import { userList } from '../recoil/userAtom';
import useLocalStorage from './hooks/useLocalStorage';

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactChild;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token] = useLocalStorage('token');

  const name = useRecoilValue(myName);
  const setUserList = useSetRecoilState(userList);
  const setRoomList = useSetRecoilState(roomListAtom);

  useEffect(() => {
    const newSocket = io('localhost:8000');
    setSocket(newSocket);
    newSocket.emit('join', name);
    newSocket.on('load_players', (players: { id: string; name: string }[]) => {
      setUserList(players);
    });
    newSocket.on('new_player', (player) => {
      setUserList((userList: { id: String; name: string }[]) => [...userList, player]);
    });
    newSocket.on('leave', (player) => {
      setUserList((userList) => [...userList].filter((user) => user.id !== player));
    });
    newSocket.on('load_rooms', (rooms: string[]) => setRoomList(rooms));
    newSocket.on('create_room', (room) => setRoomList((roomList) => [...roomList, room]));
    return () => {
      newSocket.close();
    };
  }, [token]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
