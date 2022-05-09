import React, { useState, useEffect, useRef } from 'react';

import { useResetRecoilState } from 'recoil';
import { eraserAtom, pencilAtom } from '../../recoil/canvasAtom';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
import DrawingCanvas from './DrawingCanvas';

import Canvas from '../../game/Canvas';

const Single = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const resetPencil = useResetRecoilState(pencilAtom);
  const resetEraser = useResetRecoilState(eraserAtom);

  useEffect(() => {
    const canvas = new Canvas();
    setCanvas(canvas);

    return () => {
      resetPencil();
      resetEraser();
      setCanvas(null);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <LeftSide />
      <DrawingCanvas canvas={canvas} />
      <RightSide canvas={canvas} />
    </div>
  );
};
export default Single;
