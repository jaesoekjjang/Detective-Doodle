import React, { useState } from 'react';
import { colorAtom } from '../../recoil/canvasAtom';
import { useRecoilState } from 'recoil';

import ColorButton from './ColorButton';

import { basicColors } from '../../game/utils';
import type Canvas from '../../game/Canvas';

interface RightSideProps {
  canvas: Canvas | null;
}

type RecentColors = [string, string, string];

const Palette: React.FC<RightSideProps> = () => {
  const [color, setColor] = useRecoilState(colorAtom);

  const [recentColors, setRecentColors] = useState<RecentColors>(['#000000', '#ffffff', '#ffffff']);
  const [inputColor, setInputColor] = useState(color);

  const changeColor = (
    e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const colorHex = e.currentTarget.value;
    setColor(colorHex);
    setInputColor(colorHex);

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
        onChange={(e) => setInputColor(e.currentTarget.value)}
        onBlur={changeColor}
        value={inputColor}
      />
    </div>
  );
};

export default Palette;
