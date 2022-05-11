import React from 'react';
import Left from './Left';
import Right from './Right';
import { useSocket } from '../hooks/useSocket';

const Lobby = () => {
  return (
    <div className="flex h-full">
      <Left />
      <Right />
    </div>
  );
};

export default Lobby;
