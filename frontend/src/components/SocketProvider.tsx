import React, { createContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { tokenAtom } from '../recoil/authAtom';
import { currentRoomAtom, roomListAtom } from '../recoil/roomAtom';
import { meAtom } from '../recoil/playerAtom';
import { Player } from '../types/player.interface';
import { Room } from '../types/room.interface';
import { useNavigate } from 'react-router-dom';
import useLogout from './hooks/useLogout';

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactChild;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [setToken, token] = useRecoilState(tokenAtom);
  const navigate = useNavigate();

  const [me, setMe] = useRecoilState(meAtom);
  const setCurrentRoom = useSetRecoilState(currentRoomAtom);
  const setRoomList = useSetRecoilState(roomListAtom);

  useEffect(() => {
    if (!token) return;

    const newSocket = io('localhost:8000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setMe((me) => ({ ...me, id: newSocket.id }));
      newSocket.emit('load_rooms');
    });

    newSocket.on('room_loaded', (rooms) => {
      setRoomList(new Map(Object.entries(rooms)));
    });

    newSocket.on('room_created', (roomId: string) => {
      setMe((me) => ({ ...me, roomId }));
      navigate(`room/${roomId}`);
    });

    newSocket.on('new_room', (room: Room) => {
      setRoomList((roomList) => new Map(roomList).set(room.id, room));
    });

    newSocket.on('room_joined', (room: Room) => {
      console.log(room);
      setCurrentRoom(room);
    });

    newSocket.on('player_joined', (player: Player) => {
      setCurrentRoom((room) => ({ ...room, players: [...room.players, player] }));
    });

    newSocket.on('player_left', (player: Player) => {
      setCurrentRoom((room) => ({
        ...room,
        players: [...room.players.filter((p) => p.id !== player.id)],
      }));
    });

    return () => {
      useLogout();
      newSocket.close();
    };
  }, [token]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
