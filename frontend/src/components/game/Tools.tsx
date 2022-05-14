import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { toolTypeAtom } from '../../recoil/canvasAtom';

import ToolButton from './ToolButton';
import ToolWidth from './ToolWidth';

import { Tools as ToolsType } from '../../game/models/Tools';

const Tools = () => {
  // TODO 드래그할 때 뿐만 아니라 1번 클릭 했을 때도 기능하도록.
  const [tool, setTool] = useRecoilState(toolTypeAtom);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const newTool = e.currentTarget.value;
      if (newTool === tool) return;
      setTool(newTool as ToolsType);
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
