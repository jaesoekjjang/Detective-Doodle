import React from 'react';
import { useState } from 'react';
import { clear, setTool, getToolWidth, setToolWidth } from '../../game/api';
import type { Tools as ToolsType } from '../../game/models/Tools';

const Tools = () => {
  const [toolType, setToolType] = useState<ToolsType>('pencil');
  const [width, setWidth] = useState<number>(50);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const tool = e.currentTarget.value;
    if (tool == toolType) return;

    setToolType(tool as ToolsType);
    setTool(tool as ToolsType);
    setWidth(getToolWidth());
  };

  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newWidth = +e.currentTarget.value;
    setWidth(newWidth);
    setToolWidth(newWidth);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <button className="h-10 w-40 bg-red-500 border-2 border-black" onClick={() => clear()}>
          새 그림판
        </button>
        <div>
          <button
            className={`h-10 w-20 border-2 border-black ${toolType == 'eraser' && 'clicked-tool'}`}
            value="eraser"
            onClick={handleClickTool}
          >
            지우개
          </button>
          <button
            className={`h-10 w-20 border-2 border-black ${toolType == 'pencil' && 'clicked-tool'}`}
            value="pencil"
            onClick={handleClickTool}
          >
            연필
          </button>
        </div>
      </div>
      <div>
        <input className="w-40" type="range" onChange={handleWidth} value={width} />
      </div>
    </div>
  );
};

export default Tools;
