import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Game from '../game';
import { useSocket } from '../hooks/useSocket';

const index = () => {
  const socket = useSocket();
  const roomId = useParams().id!;

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex gap-4">
      <Game mode="multi" />
    </div>
  );
};

export default index;
