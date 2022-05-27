import React, { useCallback } from 'react';

import ToolButton from './ToolButton';
import ToolWidth from './ToolWidth';

import { Tools as ToolsType } from '../../game/models/Tools';
import RedoAndUndo from './RedoAndUndo';
import ClearButton from './ClearButton';
import type Canvas from '../../game/Canvas';
import { ToolTypeContext } from './ToolTypeProvider';
import { useContext } from 'react';

interface ToolsProps {
  canvas: Canvas | null;
}

const Tools: React.FC<ToolsProps> = ({ canvas }) => {
  // TODO 드래그할 때 뿐만 아니라 1번 클릭 했을 때도 기능하도록.
  // const [tool, setTool] = useRecoilState(toolTypeAtom);
  const { toolType, setToolType } = useContext(ToolTypeContext);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const newTool = e.currentTarget.value;
      if (newTool === toolType) return;
      setToolType(newTool as ToolsType);
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
