import React, { useCallback, useState } from 'react';
import ToolButton from './ToolButton';
import ToolWidth from './ToolWidth';

import { setTool, getToolWidth } from '../../game/api';
import type { Tools as ToolsType } from '../../game/models/Tools';

const Tools = () => {
  const [clickedTool, setClickedTool] = useState<ToolsType>('pencil');
  const [width, setWidth] = useState<number>(50);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const tool = e.currentTarget.value;
      if (tool == clickedTool) return;

      setClickedTool(tool as ToolsType);
      setTool(tool as ToolsType);
      setWidth(getToolWidth());
    },
    [clickedTool]
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        <ToolButton toolType="pencil" clickedTool={clickedTool} handleClickTool={handleClickTool} />
        <ToolButton toolType="eraser" clickedTool={clickedTool} handleClickTool={handleClickTool} />
      </div>
      <ToolWidth width={width} setWidth={setWidth} />
    </div>
  );
};

export default Tools;
