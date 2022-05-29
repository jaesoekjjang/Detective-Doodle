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

  return (
    <div>
      <input className="line-width" type="range" onChange={handleWidth} value={inputWidth} />
    </div>
  );
};

export default ToolWidth;
