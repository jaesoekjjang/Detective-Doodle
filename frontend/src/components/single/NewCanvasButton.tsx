import React from 'react';
import { clearCanvas } from '../../game/api';

const NewCanvasButton = () => {
  return (
    <button onClick={clearCanvas} className="h-10 w-40 bg-red-500 border-2 border-black">
      새 그림판
    </button>
  );
};

export default NewCanvasButton;
