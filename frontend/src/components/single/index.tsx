import React, { useEffect, useState } from 'react';
import RightSide from './RightSide';
import { WIDTH, HEIGHT, startGame, endGame } from '../../game/api';
import LeftSide from './LeftSide';

const Single = () => {
  useEffect(() => {
    startGame();
    return () => endGame();
  }, []);

  const [width, setWidth] = useState<number>(50);
  const cursorRadius = Math.max((width * 15 * 4) / 100 / 2, 3);

  return (
    <div className="flex gap-2">
      <LeftSide />
      <canvas
        style={{
          cursor: `
        url("data:image/svg+xml,%3Csvg width='${cursorRadius}' height='${cursorRadius}' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E")
          ${cursorRadius / 2} ${cursorRadius / 2}, pointer
        `,
        }}
        id="canvas"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
      <RightSide width={width} setWidth={setWidth} />
    </div>
  );
};

export default Single;
