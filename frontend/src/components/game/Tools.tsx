import React from 'react';
import { useState } from 'react';
import { clear, setTool, setPencilWidth, setEraserWidth } from '../../game/api';

const Tools = () => {
  const handleWidth = () => {};

  return (
    <div>
      <div className="flex flex-col gap-4">
        <button className="h-10 w-40 bg-red-500 border-2 border-black" onClick={() => clear()}>
          새 그림판
        </button>
        <div>
          <button className="h-10 w-20 border-2 border-black" onClick={() => setTool('eraser')}>
            지우개
          </button>
          <button className="h-10 w-20 border-2 border-black" onClick={() => setTool('pencil')}>
            연필
          </button>
        </div>
      </div>
      <div>
        <input className="w-40" type="range" />
      </div>
    </div>
  );
};

export default Tools;
