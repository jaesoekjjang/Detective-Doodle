import React, { useState, useEffect, useRef } from 'react';

import { useResetRecoilState } from 'recoil';
import { eraserWidthAtom, pencilWidthAtom } from '../../recoil/canvasAtom';

import Side from './Side';
import DrawingCanvas from './DrawingCanvas';

import Canvas from '../../game/Canvas';
import Tools from './Tools';

export type Mode = 'single' | 'multi';

const Game: React.FC = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new Canvas(containerRef);
    setCanvas(canvas);

    return () => {
      resetPencil();
      resetEraser();
      setCanvas(null);
    };
  }, []);

  const resetEraser = useResetRecoilState(eraserWidthAtom);
  const resetPencil = useResetRecoilState(pencilWidthAtom);

  //TODO Side나 GameInfo 컴포넌트가 없어도 Canvas는 항상 가운데에 있을 수 있도록 레이아웃을 변경.
  return (
    <div className="flex justify-center items-center h-screen">
      <Side />
      <DrawingCanvas canvas={canvas} ref={containerRef} />
      <Tools canvas={canvas} />
    </div>
  );
};
export default Game;
