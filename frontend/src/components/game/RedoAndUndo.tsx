import React from 'react';

import Redo from './Redo';
import Undo from './Undo';

import type Canvas from '../../game/Canvas';

interface RedoAndUndoProps {
  canvas: Canvas | null;
}

const RedoAndUndo: React.FC<RedoAndUndoProps> = ({ canvas }) => {
  const handleClickUndo = () => {
    canvas?.undo();
  };

  const handleClickRedo = () => {
    canvas?.redo();
  };

  return (
    <div>
      <button className="w-20 h-10 border-2 border-black text-center" onClick={handleClickUndo}>
        <Undo />
      </button>
      <button className="w-20 h-10 border-2 border-black text-center" onClick={handleClickRedo}>
        <Redo />
      </button>
    </div>
  );
};

export default RedoAndUndo;
