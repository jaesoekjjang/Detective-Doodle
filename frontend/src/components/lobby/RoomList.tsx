import React from 'react';
import { useRecoilValue } from 'recoil';
import { roomListAtom } from '../../recoil/roomAtom';
import RoomButton from './RoomButton';

const RoomList = () => {
  const roomList = useRecoilValue(roomListAtom);
  return (
    <div className="flex flex-col h-1/2 border-2 border-black overflow-scroll">
      {Array.from(roomList.values()).map(
        (room) => room.status === 'waiting' && <RoomButton key={room.id} room={room} />
      )}
    </div>
  );
};

export default RoomList;
