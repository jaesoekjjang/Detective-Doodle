import React from 'react';
import { setPencilColor } from '../../game/api';

const colors = {
  red: 'rgb(239 68 68)',
  yellow: 'rgb(234 179 8)',
  green: 'rgb(34 197 94)',
  blue: 'rgb(59 130 246)',
} as const;

const Palette = () => {
  const changeColor: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setPencilColor(e.currentTarget.value);
  };

  const mapButtons = () => {
    return (
      <>
        <button onClick={changeColor} className={`w-10 h-10 bg-black`} value="rgba(0,0,0)"></button>
        {Object.keys(colors).map((k, i) => (
          <button
            onClick={changeColor}
            className={`w-10 h-10 bg-${k}-500`}
            value={colors[k as keyof typeof colors]}
          ></button>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex flex-col gap-2 w-20 border-black border-2">{mapButtons()}</div>
  );
};

export default Palette;
