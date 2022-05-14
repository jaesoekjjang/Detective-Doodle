import React, { useState, useEffect, useRef } from 'react';

import { useResetRecoilState } from 'recoil';
import { eraserAtom, pencilAtom } from '../../recoil/canvasAtom';

import Side from './Side';
import DrawingCanvas from './DrawingCanvas';

import Canvas from '../../game/Canvas';

export type Mode = 'single' | 'multi';
export type Status = 'waiting' | 'guessing' | 'drawing';

interface GameProps {
  mode: Mode;
  // status: Status;
}

const Game: React.FC<GameProps> = ({ mode }) => {
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

  const [status, setStatus] = useState<Status>(mode === 'single' ? 'drawing' : 'waiting');

  const resetPencil = useResetRecoilState(pencilAtom);
  const resetEraser = useResetRecoilState(eraserAtom);

  //TODO Side나 GameInfo 컴포넌트가 없어도 Canvas는 항상 가운데에 있을 수 있도록 레이아웃을 변경.
  return (
    <div className="flex gap-2">
      <Side canvas={canvas} status={status} />
      <DrawingCanvas canvas={canvas} status={status} ref={containerRef} />
    </div>
  );
};
export default Game;
