import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Palette from './Palette';
import Tools from './Tools';
import { WIDTH, HEIGHT, startGame, endGame } from '../../game/api';

const Single = () => {
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="flex gap-2">
      <div>
        <Link to="/" onClick={() => endGame()}>
          나가기
        </Link>
      </div>
      <div className="flex">
        <canvas id="canvas" width={WIDTH} height={HEIGHT}></canvas>
      </div>
      <div>
        <Tools />
        <Palette />
      </div>
    </div>
  );
};

export default Single;
