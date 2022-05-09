import React, { useState, useRef } from 'react';
import { cursorRadius } from '../../recoil/canvasAtom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import LeftSide from './LeftSide';
import RightSide from './RightSide';

import DrawingCanvas from './DrawingCanvas';
import { Tools } from '../../game/models/Tools';

const Single = () => {
  const isDrawing = useRef(false);

  const radius = useRecoilValue(cursorRadius);

  return (
    <div className="flex gap-2">
      <LeftSide />
      <DrawingCanvas isDrawing={isDrawing.current} />
      <RightSide />
    </div>
  );
};
export default Single;
