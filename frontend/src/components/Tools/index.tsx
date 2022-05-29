import React, { useCallback, useContext } from 'react';
import { ToolTypeContext } from '../ToolTypeProvider';

import ToolButton from './ToolButton';
import ToolWidth from './ToolWidth';

import RedoAndUndo from './RedoAndUndo';
import ClearButton from './ClearButton';
import type Canvas from '../../drawing/Canvas';
import { ToolTypes } from '../../drawing/models/TooTypes';

interface ToolsProps {
  canvas: Canvas | null;
}

const Tools: React.FC<ToolsProps> = ({ canvas }) => {
  const { toolType, setToolType } = useContext(ToolTypeContext);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const newTool = e.currentTarget.value;
      if (newTool === toolType) return;
      setToolType(newTool as ToolTypes);
    },
    [toolType]
  );

  return (
    <div className="flex flex-col gap-2">
      <ToolWidth />
      <div>
        <ToolButton type="pencil" tool={toolType} handleClickTool={handleClickTool} />
        <ToolButton type="eraser" tool={toolType} handleClickTool={handleClickTool} />
      </div>
      <div>
        <ToolButton type="rectangle" tool={toolType} handleClickTool={handleClickTool} />
        <ToolButton type="ellipse" tool={toolType} handleClickTool={handleClickTool} />
      </div>
      <div>
        <ToolButton type="line" tool={toolType} handleClickTool={handleClickTool} />
        <ToolButton type="bucket" tool={toolType} handleClickTool={handleClickTool} />
      </div>
      <RedoAndUndo canvas={canvas} />
      <ClearButton canvas={canvas} />
    </div>
  );
};

export default Tools;
