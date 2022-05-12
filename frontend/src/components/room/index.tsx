import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { myName } from '../../recoil/myInfoAtom';
import { roomUserListAtom } from '../../recoil/userAtom';
import Game from '../game';
import { useSocket } from '../hooks/useSocket';
import GameInfoAndMessage from './GameInfoAndMessage';

const index = () => {
  const socket = useSocket();
  const [userList, setUserList] = useRecoilState(roomUserListAtom);
  const userName = useRecoilValue(myName);
  const roomId = useParams().id;

  useEffect(() => {
    socket?.emit('join_room', { roomId, userName });
    socket?.on('load_room_users', (users) => setUserList(() => users));
  }, []);

  return (
    <div className="flex gap-4">
      <Game />
      <GameInfoAndMessage />
    </div>
  );
};

export default index;
