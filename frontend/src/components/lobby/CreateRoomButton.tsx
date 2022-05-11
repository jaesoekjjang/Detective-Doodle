import React from 'react';
import { useSetRecoilState } from 'recoil';
import { roomListAtom } from '../../recoil/roomAtom';
import { useSocket } from '../hooks/useSocket';

const CreateRoomButton = () => {
  const socket = useSocket();
  const setRoomList = useSetRecoilState(roomListAtom);

  const handleClick = () => {
    socket?.emit('create_room');
  };

  return (
    <button type="button" onClick={handleClick}>
      방 만들기
    </button>
  );
};

export default CreateRoomButton;
