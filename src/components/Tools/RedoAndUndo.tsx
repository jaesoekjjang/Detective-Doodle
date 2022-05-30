import React from 'react';

import Redo from '../icons/Redo';
import Undo from '../icons/Undo';

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
    <>
      <button type="button" className="tool" onClick={handleClickUndo}>
        <Undo />
      </button>
      <button type="button" className="tool" onClick={handleClickRedo}>
        <Redo />
      </button>
    </>
  );
};

export default RedoAndUndo;
