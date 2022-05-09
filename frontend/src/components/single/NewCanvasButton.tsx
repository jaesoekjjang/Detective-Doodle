import React from 'react';
import type Canvas from '../../game/Canvas';

interface NewCanvasButtonProps {
  canvas: Canvas | null;
}

const NewCanvasButton: React.FC<NewCanvasButtonProps> = ({ canvas }) => {
  const handleClick = () => {
    if (!canvas) return;
    canvas.clear();
  };

  return (
    <button onClick={handleClick} className="h-10 w-40 bg-red-500 border-2 border-black">
      새 그림판
    </button>
  );
};

export default NewCanvasButton;
