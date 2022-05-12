import React, { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Tools as ToolsType } from '../../game/models/Tools';

import { toolTypeAtom, lineWidth } from '../../recoil/canvasAtom';
import ToolButton from './ToolButton';
import ToolWidth from './ToolWidth';

const Tools = () => {
  const [tool, setTool] = useRecoilState(toolTypeAtom);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const newTool = e.currentTarget.value;
      if (newTool === tool) return;
      setTool((tool) => newTool as ToolsType);
    },
    [tool]
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        <ToolButton type="pencil" tool={tool} handleClickTool={handleClickTool} />
        <ToolButton type="eraser" tool={tool} handleClickTool={handleClickTool} />
      </div>
      <ToolWidth />
    </div>
  );
};

export default Tools;
