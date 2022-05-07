import React from 'react';

interface ColorButtonProps {
  changeColor: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color: string;
}

const ColorButton: React.FC<ColorButtonProps> = ({ changeColor, color }) => {
  return (
    <button
      onClick={changeColor}
      className="palette-block"
      style={{ background: color }}
      value={color}
    ></button>
  );
};

export default ColorButton;
