import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Left from './Left';
import Right from './Right';
import { userList as users } from '../../recoil/userAtom';
import { myName as myInfo } from '../../recoil/myInfoAtom';
import { useSocket } from '../hooks/useSocket';

const Lobby = () => {
  const [userList, setUserList] = useRecoilState(users);
  const [myName, setMyName] = useRecoilState(myInfo);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit('join', `${Math.random() * 10}님`);
      socket.on('existing_players', (players: { id: string; name: string }[]) => {
        setUserList(players);
      });
      socket.on('new_player', (player) => {
        setUserList((userList: { id: String; name: string }[]) => [...userList, player]);
      });
      socket.on('leave', (player) => {
        setUserList((userList) => [...userList].filter((user) => user.id !== player));
      });
    }
  }, [socket]);

  return (
    <div className="flex h-full">
      <Left />
      <Right />
    </div>
  );
};

export default Lobby;
