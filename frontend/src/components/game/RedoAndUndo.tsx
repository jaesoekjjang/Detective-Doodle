import React from 'react';

import Redo from './Redo';
import Undo from './Undo';

import type Canvas from '../../game/Canvas';
import { useSocket } from '../hooks/useSocket';

interface RedoAndUndoProps {
  canvas: Canvas | null;
}

const RedoAndUndo: React.FC<RedoAndUndoProps> = ({ canvas }) => {
  const socket = useSocket();

  const handleClickUndo = () => {
    canvas?.undo();
    socket?.emit('undo');
  };

  const handleClickRedo = () => {
    canvas?.redo();
    socket?.emit('redo');
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
