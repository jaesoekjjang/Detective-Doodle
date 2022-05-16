import React from 'react';
import { useRecoilValue } from 'recoil';
import { roomListAtom } from '../../recoil/roomAtom';
import RoomButton from './RoomButton';

const RoomList = () => {
  const roomList = useRecoilValue(roomListAtom);
  console.log(Array.from(roomList.values()));
  return (
    <div className="flex flex-col h-1/2 border-2 border-black overflow-scroll">
      {Array.from(roomList.values()).map((room) => (
        <RoomButton key={room.id} roomId={room.id} roomName={room.name} />
      ))}
    </div>
  );
};

export default RoomList;
