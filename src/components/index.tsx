import React, { useState, useEffect, useRef } from 'react';

import DrawingCanvas from './DrawingCanvas';
import Tools from './Tools';
import Palette from './Palette/Palette';

import Canvas from '../drawing/Canvas';
import ToolWidth from './Tools/ToolWidth';

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
    <div className="flex flex-col justify-center items-center gap-4 h-screen bg-blue-800">
      <div className="flex items-center gap-8">
        <Palette />
        <div>
          <DrawingCanvas canvas={canvas} ref={containerRef} />
        </div>
        <Tools canvas={canvas} />
      </div>
      <ToolWidth />
    </div>
  );
};
export default Game;
