import React from 'react';
import { Tools } from '../../game/models/Tools';

interface ToolButtonProps {
  clickedTool: Tools;
  toolType: Tools;
  handleClickTool: React.MouseEventHandler<HTMLButtonElement>;
}

const englishToKorean = {
  pencil: '연필',
  eraser: '지우개',
};

const ToolButton: React.FC<ToolButtonProps> = ({ clickedTool, toolType, handleClickTool }) => {
  return (
    <button
      className={`h-10 w-20 border-2 border-black ${toolType == clickedTool && 'clicked-tool'}`}
      value={toolType}
      onClick={handleClickTool}
    >
      {englishToKorean[toolType]}
    </button>
  );
};

export default ToolButton;
