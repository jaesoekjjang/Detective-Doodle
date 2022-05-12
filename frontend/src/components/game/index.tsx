import React, { useState, useEffect } from 'react';

import { useResetRecoilState } from 'recoil';
import { eraserAtom, pencilAtom } from '../../recoil/canvasAtom';

import Side from './Side';
import DrawingCanvas from './DrawingCanvas';

import Canvas from '../../game/Canvas';

type Mode = 'single' | 'multi';

const Game = () => {
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

  const isMulti = (mode: Mode): mode is 'single' => {
    return mode === 'multi';
  };

  return (
    <div className="flex gap-2">
      <Side canvas={canvas} />
      <DrawingCanvas canvas={canvas} />
    </div>
  );
};
export default Game;
