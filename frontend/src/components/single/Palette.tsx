import React, { useState } from 'react';
import { setPencilColor, basicColors } from '../../game/api';
import ColorButton from './ColorButton';

type RecentColors = [string, string, string];

const Palette = () => {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [recentColors, setRecentColors] = useState<RecentColors>(['#000000', '#ffffff', '#ffffff']);

  const changeColor = (
    e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const colorHex = e.currentTarget.value;

    setCurrentColor(colorHex);
    setPencilColor(colorHex);
    if (recentColors.includes(colorHex)) return;
    setRecentColors((recentColors) => [colorHex, ...recentColors.slice(0, 2)] as RecentColors);
  };

  const mapRecentColorsButtons = (recentColors: string[]) =>
    recentColors.map((color, index) => (
      <ColorButton key={color + index} changeColor={changeColor} color={color}></ColorButton>
    ));

  return (
    <div className="flex w-44 flex-col gap-4 ">
      <div className="flex flex-wrap gap-2">{mapRecentColorsButtons(recentColors)}</div>
      <hr className="w-40" style={{ height: '2px', background: 'black' }} />
      <div className="flex flex-wrap gap-2">{mapRecentColorsButtons(basicColors)}</div>
      <input
        className="color-input"
        type="color"
        onChange={(e) => setCurrentColor(e.currentTarget.value)}
        onBlur={changeColor}
        value={currentColor}
      />
    </div>
  );
};

export default Palette;
