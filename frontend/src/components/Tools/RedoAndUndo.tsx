import React from 'react';

import Redo from './Redo';
import Undo from './Undo';

import type Canvas from '../../drawing/Canvas';

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
      <button type="button" className="tool border-black" onClick={handleClickUndo}>
        <Undo />
      </button>
      <button type="button" className="tool border-black" onClick={handleClickRedo}>
        <Redo />
      </button>
    </div>
  );
};

export default RedoAndUndo;
