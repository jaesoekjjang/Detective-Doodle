import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { meAtom } from '../../recoil/playerAtom';
import { currentRoomAtom } from '../../recoil/roomAtom';
import { Player } from '../../types/player.interface';
import { Room } from '../../types/room.interface';
import Game from '../game';
import { useSocket } from '../hooks/useSocket';

const index = () => {
  const roomId = useParams().id!;
  const socket = useSocket();

  const [isPlaying, setIsPlaying] = useState(false);
  const me = useRecoilValue(meAtom);
  const [room, setCurrentRoom] = useRecoilState(currentRoomAtom);
  const resetCurrentRoom = useResetRecoilState(currentRoomAtom);

  useEffect(() => {
    socket?.emit('join_room', { roomId, player: me });

    return () => {
      socket?.emit('leave_room', { roomId, player: me });
      resetCurrentRoom();
    };
  }, []);

  return (
    <div className="flex gap-4">
      <Game mode="multi" />
    </div>
  );
};

export default index;
