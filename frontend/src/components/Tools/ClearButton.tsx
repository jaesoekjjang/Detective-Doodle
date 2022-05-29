import React from 'react';
import type Canvas from '../../drawing/Canvas';

interface ClearButtonProps {
  canvas: Canvas | null;
}

const ClearButton: React.FC<ClearButtonProps> = ({ canvas }) => {
  const handleClick = () => {
    if (!canvas) return;
    canvas.clear();
  };

  return (
    <button onClick={handleClick} className="tool clear-canvas">
      새 그림판
    </button>
  );
};

export default ClearButton;
