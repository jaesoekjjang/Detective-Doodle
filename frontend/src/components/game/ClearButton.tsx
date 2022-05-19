import React from 'react';
import { useSocket } from '../hooks/useSocket';
import type Canvas from '../../game/Canvas';

interface ClearButtonProps {
  canvas: Canvas | null;
}

const ClearButton: React.FC<ClearButtonProps> = ({ canvas }) => {
  const socket = useSocket();

  const handleClick = () => {
    if (!canvas) return;
    canvas.clear();
    socket?.emit('clear');
  };

  return (
    <button onClick={handleClick} className="h-10 w-40 bg-red-500 border-2 border-black">
      새 그림판
    </button>
  );
};

export default ClearButton;
