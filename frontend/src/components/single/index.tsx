import React, { useEffect } from 'react';
import RightSide from './RightSide';
import { WIDTH, HEIGHT, startGame, endGame } from '../../game/api';
import LeftSide from './LeftSide';

const Single = () => {
  useEffect(() => {
    startGame();
    return () => endGame();
  }, []);

  return (
    <div className="flex gap-2">
      <LeftSide />
      <canvas id="canvas" width={WIDTH} height={HEIGHT}></canvas>
      <RightSide />
    </div>
  );
};

export default Single;
