import React from 'react';
import { setToolWidth } from '../../game/api';

interface ToolWidthProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

const ToolWidth: React.FC<ToolWidthProps> = ({ width, setWidth }) => {
  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newWidth = +e.currentTarget.value;
    setWidth(newWidth);
    setToolWidth(newWidth);
  };

  return <input className="w-40" type="range" onChange={handleWidth} value={width} />;
};

export default ToolWidth;
