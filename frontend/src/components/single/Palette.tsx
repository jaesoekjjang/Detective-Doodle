import React, { useState } from 'react';
import { colors, setPencilColor } from '../../game/api';

type ColorName = keyof typeof colors;

const Palette = () => {
  const [color, setColor] = useState('black');

  const changeColor = (
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColor = e.currentTarget.value as ColorName;
    setColor(newColor);
    setPencilColor(newColor);
  };

  const mapColorButtons = () =>
    Object.keys(colors).map((k) => (
      <button
        key={k}
        onClick={changeColor}
        className={`w-10 h-10 palette-${k}`}
        value={colors[k as ColorName]}
      ></button>
    ));

  return (
    <div>
      {mapColorButtons()}
      <input type="color" onChange={changeColor} value={color} />
    </div>
  );
};

export default Palette;
