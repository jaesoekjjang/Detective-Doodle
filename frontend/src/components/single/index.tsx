import React, { useEffect } from 'react';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { lineWidth, toolType, cursorRadius } from '../../recoil/canvasAtom';

import RightSide from './RightSide';
import LeftSide from './LeftSide';

import { WIDTH, HEIGHT, startGame, endGame } from '../../game/api';

const Single = () => {
  const resetLineWidth = useResetRecoilState(lineWidth);
  const resetTool = useResetRecoilState(toolType);

  useEffect(() => {
    startGame();
    return () => {
      endGame();
      resetLineWidth();
      resetTool();
    };
  }, []);

  const radius = useRecoilValue(cursorRadius);

  return (
    <div className="flex gap-2">
      <LeftSide />
      <canvas
        style={{
          cursor: `
          url("data:image/svg+xml,%3Csvg width='${radius}' height='${radius}' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E")
            ${radius / 2} ${radius / 2}, pointer
          `,
        }}
        id="canvas"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
      <RightSide />
    </div>
  );
};

export default Single;
