import React from 'react';
// import { undo, redo } from '../../game/api';
import Redo from './Redo';
import Undo from './Undo';

const RedoAndUndo = () => {
  return (
    <div>
      <button className="w-20 h-10 border-2 border-black text-center" onClick={() => {}}>
        <Undo />
      </button>
      <button className="w-20 h-10 border-2 border-black text-center" onClick={() => {}}>
        <Redo />
      </button>
    </div>
  );
};

export default RedoAndUndo;
