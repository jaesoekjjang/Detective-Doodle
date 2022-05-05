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
        className={`palette-${k}`}
        value={colors[k as ColorName]}
      ></button>
    ));

  return (
    <div className="flex w-44 flex-col gap-4 ">
      <div className="flex flex-wrap gap-2">
        <button className="palette-block"></button>
        <button className="palette-block"></button>
        <button className="palette-block"></button>
      </div>
      <hr className="w-40" style={{ height: '2px', background: 'black' }} />
      <div className="flex flex-wrap gap-2">{mapColorButtons()}</div>
      <input className="color-input" type="color" onChange={changeColor} value={color} />
    </div>
  );
};

export default Palette;
