import React from 'react';
import type Canvas from '../../drawing/Canvas';
import Clear from '../icons/Clear';

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
      <Clear />
    </button>
  );
};

export default ClearButton;
