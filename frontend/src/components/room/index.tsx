import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { meAtom } from '../../recoil/playerAtom';
import { playerListAtom } from '../../recoil/playerAtom';
import Game from '../game';
import { useSocket } from '../hooks/useSocket';
import GameInfoAndMessage from './GameInfoAndMessage';

const index = () => {
  const socket = useSocket();
  const [userList, setUserList] = useRecoilState(playerListAtom);
  const me = useRecoilValue(meAtom);
  const roomId = useParams().id;

  useEffect(() => {
    socket?.emit('join_room', { roomId, me });
    socket?.on('load_room_users', (users) => setUserList(() => users));
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex gap-4">
      <Game mode="multi" />
      <GameInfoAndMessage />
    </div>
  );
};

export default index;
