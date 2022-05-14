import React from 'react';
import { useRecoilValue } from 'recoil';
import { roomListAtom } from '../../recoil/roomAtom';
import RoomButton from './RoomButton';

const RoomList = () => {
  const roomList = useRecoilValue(roomListAtom);

  console.log(roomList);
  return (
    <div className="flex flex-col h-1/2 border-2 border-black overflow-scroll">
      {roomList.map((room) => (
        <RoomButton key={room.id} roomName={room.name}></RoomButton>
      ))}
    </div>
  );
};

export default RoomList;
