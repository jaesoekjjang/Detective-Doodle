import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { meAtom } from '../../recoil/playerAtom';
import { roomListAtom } from '../../recoil/roomAtom';
import { useSocket } from '../hooks/useSocket';

const CreateRoomButton = () => {
  const socket = useSocket();
  const setRoomList = useSetRecoilState(roomListAtom);
  const me = useRecoilValue(meAtom);

  const handleClick = () => {
    socket?.emit('create_room', {
      room: {
        name: `${Math.floor(Math.random() * 1000)}번 방`,
        description: '테스트',
      },
      creator: me,
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      방 만들기
    </button>
  );
};

export default CreateRoomButton;
