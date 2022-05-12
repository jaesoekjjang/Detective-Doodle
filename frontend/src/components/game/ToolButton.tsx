import React from 'react';
import type { Tools } from '../../game/models/Tools';

interface ToolButtonProps {
  type: Tools;
  tool: Tools;
  handleClickTool: React.MouseEventHandler<HTMLButtonElement>;
}

const englishToKorean = {
  pencil: '연필',
  eraser: '지우개',
};

const ToolButton: React.FC<ToolButtonProps> = ({ type, tool, handleClickTool }) => {
  return (
    <button
      className={`h-10 w-20 border-[1px] border-black ${type == tool && 'clicked-tool'}`}
      value={type}
      onClick={handleClickTool}
    >
      {englishToKorean[type]}
    </button>
  );
};

export default ToolButton;
