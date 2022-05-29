import React, { useContext, useState } from 'react';
import { ToolDataContext } from '../ToolDataProvider';

import { convertToInputWidth, convertToToolWidth } from '../../utils';

const ToolWidth = () => {
  const { toolData, setToolData } = useContext(ToolDataContext);
  const [inputWidth, setInputWidth] = useState(convertToInputWidth(toolData.width));

  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const width = +e.currentTarget.value;
    setInputWidth(width);
    setToolData((toolData) => ({ ...toolData, width: convertToToolWidth(width) }));
  };

  return <input className="w-40" type="range" onChange={handleWidth} value={inputWidth} />;
};

export default ToolWidth;
