import React from 'react';
import Left from './Left';
import Right from './Right';
import { useSocket } from '../hooks/useSocket';

const Lobby = () => {
  return (
    <div className="flex w-[68rem] h-[38rem]">
      <Left />
      <Right />
    </div>
  );
};

export default Lobby;
