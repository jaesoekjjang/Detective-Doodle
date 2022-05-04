import React from 'react';
import { setPencilColor, colors } from '../../game/api';

const Palette = () => {
  const changeColor: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setPencilColor(e.currentTarget.value);
  };

  const mapColorButtons = () => {
    return (
      <>
        <button onClick={changeColor} className={`w-10 h-10 bg-black`} value="rgba(0,0,0)"></button>
        {Object.keys(colors).map((k) => (
          <button
            key={k}
            onClick={changeColor}
            className={`w-10 h-10 bg-${k}-500`}
            value={colors[k as keyof typeof colors]}
          ></button>
        ))}
      </>
    );
  };

  return <div>{mapColorButtons()}</div>;
};

export default Palette;
