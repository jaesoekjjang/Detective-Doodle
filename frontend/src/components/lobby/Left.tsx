import React from 'react';
import Profile from './Profile';

const Left = () => {
  return (
    <div className=" flex flex-col basis-1/4 h-full  border-2 border-black">
      <Profile />
      <div className="basis-3/5">유저 목록</div>
    </div>
  );
};

export default Left;
