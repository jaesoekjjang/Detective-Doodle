import React, { useState, useEffect, useRef } from 'react';

import DrawingCanvas from './DrawingCanvas';
import Canvas from '../../game/Canvas';
import Tools from './Tools';
import Palette from './Palette';

const Game: React.FC = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new Canvas(containerRef);
    setCanvas(canvas);

    return () => {
      setCanvas(null);
    };
  }, []);

  return (
    <div className="flex justify-center items-center gap-8 h-screen bg-blue-900">
      <Palette />
      <DrawingCanvas canvas={canvas} ref={containerRef} />
      <Tools canvas={canvas} />
    </div>
  );
};
export default Game;
