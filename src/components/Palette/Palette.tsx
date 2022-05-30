import React, { useContext, useState } from 'react';
import { ToolDataContext } from '../ToolDataProvider';

import ColorButton from './ColorButton';
import { basicColors } from '../../utils';

type RecentColors = [string, string, string];

const Palette: React.FC = () => {
  const { toolData, setToolData } = useContext(ToolDataContext);

  const [recentColors, setRecentColors] = useState<RecentColors>(['#000000', '#ffffff', '#ffffff']);
  const [inputColor, setInputColor] = useState(toolData.color);

  const changeColor = (
    e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const colorHex = e.currentTarget.value;
    setToolData((toolData) => ({ ...toolData, color: colorHex }));
    setInputColor(colorHex);

    if (recentColors.includes(colorHex)) return;
    setRecentColors((recentColors) => [colorHex, ...recentColors.slice(0, 2)] as RecentColors);
  };

  const mapColorButtons = (recentColors: string[]) =>
    recentColors.map((color, index) => (
      <ColorButton key={color + index} changeColor={changeColor} color={color}></ColorButton>
    ));

  return (
    <div className="side">
      {mapColorButtons(recentColors)}
      <hr className="w-full" style={{ height: '2px', background: 'black' }} />
      {mapColorButtons(basicColors)}
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
