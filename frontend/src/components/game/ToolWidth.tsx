import React, { useContext, useState } from 'react';
import { DrawDataContext } from './DrawDataProvider';

import { convertToInputWidth, convertToToolWidth } from '../../game/utils';

const ToolWidth = () => {
  const { drawData, setDrawData } = useContext(DrawDataContext);
  const [inputWidth, setInputWidth] = useState(convertToInputWidth(drawData.width));

  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const width = +e.currentTarget.value;
    setInputWidth(width);
    setDrawData((drawData) => ({ ...drawData, width: convertToToolWidth(width) }));
  };

  return <input className="w-40" type="range" onChange={handleWidth} value={inputWidth} />;
};

export default ToolWidth;
