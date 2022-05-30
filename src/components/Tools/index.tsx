import React, { useCallback, useContext } from 'react';
import { ToolTypeContext } from '../ToolTypeProvider';

import RedoAndUndo from './RedoAndUndo';
import ClearButton from './ClearButton';

import Pencil from '../icons/Pencil';
import Line from '../icons/Line';
import Eraser from '../icons/Eraser';
import Bucket from '../icons/Bucket';
import Rectangle from '../icons/Rectangle';
import Ellipse from '../icons/Ellipse';

import type Canvas from '../../drawing/Canvas';
import type { ToolTypes } from '../../drawing/models/TooTypes';

interface ToolsProps {
  canvas: Canvas | null;
}

const tools = {
  pencil: Pencil,
  eraser: Eraser,
  rectangle: Rectangle,
  ellipse: Ellipse,
  line: Line,
  bucket: Bucket,
};

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
    <div className="side">
      {Object.entries(tools).map((tool) => (
        <button
          className={`tool ${tool[0] == toolType && 'clicked'}`}
          value={tool[0]}
          onClick={handleClickTool}
        >
          {React.createElement(tool[1])}
        </button>
      ))}
      <RedoAndUndo canvas={canvas} />
      <ClearButton canvas={canvas} />
    </div>
  );
};

export default Tools;
