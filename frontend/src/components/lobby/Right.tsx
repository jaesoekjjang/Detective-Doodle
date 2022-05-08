import React from 'react';
import { Link } from 'react-router-dom';
import RoomList from './RoomList';

const Right = () => {
  return (
    <div className="flex-col basis-3/4 h-full  p-6 border-2 border-black">
      <div className="flex justify-between border-2 border-black">
        <div className="flex gap-4">
          <div>빠른 입장</div>
          <div>방 만들기</div>
        </div>
        <div>
          <Link to="/single">혼자 놀기</Link>
        </div>
      </div>
      <RoomList />
      <div className="h-2/5 border-2 border-black"></div>
    </div>
  );
};

export default Right;
