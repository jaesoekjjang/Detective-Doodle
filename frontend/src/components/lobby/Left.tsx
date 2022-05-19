import React from 'react';
import { useRecoilValue } from 'recoil';
import { roomPlayerListAtom } from '../../recoil/playerAtom';
import Profile from './Profile';

const Left = () => {
  // const players = useRecoilValue(roomPlayerListAtom);

  const handleClick = () => {
    localStorage.removeItem('detective-doodle-token');
  };

  return (
    <div className=" flex flex-col basis-1/4 h-full  border-2 border-black">
      <Profile />
      <div onClick={handleClick}>로그아웃</div>
    </div>
  );
};

export default Left;
