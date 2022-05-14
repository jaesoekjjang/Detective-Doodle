import React, { createContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { tokenAtom } from '../recoil/authAtom';
import { roomListAtom } from '../recoil/roomAtom';
import { meAtom, playerListAtom } from '../recoil/playerAtom';
import { Player } from '../types/player.interface';

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactChild;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useRecoilValue(tokenAtom);

  const [me, setMe] = useRecoilState(meAtom);
  const setPlayerList = useSetRecoilState(playerListAtom);
  const setRoomList = useSetRecoilState(roomListAtom);

  useEffect(() => {
    if (!token) return;

    const newSocket = io('localhost:8000');
    setMe((me) => ({ ...me, id: newSocket.id }));
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_lobby', { ...me, id: newSocket.id });
    });
    newSocket.on('load_players', (players: Player[]) => {
      setPlayerList(players);
    });
    newSocket.on('new_player_joined', (player: Player) => {
      setPlayerList((players) => [...players, player]);
    });
    newSocket.on('player_left_lobby', (player: Player) => {
      setPlayerList((players) => [...players].filter((p) => p.id !== player.id));
    });
    newSocket.on('load_rooms', (rooms: string[]) => console.log(rooms));
    newSocket.on('room_created', (room) => setRoomList((roomList) => [...roomList, room]));
    return () => {
      newSocket.emit('leave_room', { roomId: newSocket.id, player: me });
      newSocket.close();
    };
  }, [token]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
