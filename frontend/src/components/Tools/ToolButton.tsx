import React from 'react';
import type { ToolTypes } from '../../drawing/models/TooTypes';

interface ToolButtonProps {
  type: ToolTypes;
  tool: ToolTypes;
  handleClickTool: React.MouseEventHandler<HTMLButtonElement>;
}

const englishToKorean = {
  pencil: '연필',
  eraser: '지우개',
  rectangle: '사각형',
  ellipse: '원형',
  line: '직선',
  bucket: '채우기',
};

const ToolButton: React.FC<ToolButtonProps> = ({ type, tool, handleClickTool }) => {
  return (
    <button className={`tool ${type == tool && 'clicked'}`} value={type} onClick={handleClickTool}>
      {englishToKorean[type]}
    </button>
  );
};

export default ToolButton;
